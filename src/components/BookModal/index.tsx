import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { ActionMeta, MultiValue } from "react-select";
import { TextColor } from "src/components/Typography";
import BaseInput from "src/components/BaseInputs";
import Bullet from "src/components/Bullet";
import useReservations from "src/hooks/useReservations";
import Modal from "src/components/Modal";
import MainInput from "src/components/BaseInputs/MainInput";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import reservationMutation from "src/hooks/mutation/reservationMutation";
import { successToast } from "src/utils/toast";
import { ValueLabel } from "src/utils/types";
import MultiSelect from "src/components/BaseInputs/MultiSelect";
import Loading from "src/components/Loader";
import useInvitations from "src/hooks/useInvitations";
import useQueryString from "src/hooks/custom/useQueryString";
import { useRemoveParams } from "src/hooks/custom/useCustomNavigate";
import Alert from "../Alert";

const today = new Date();

const BookModal = () => {
  const { refetch } = useReservations({
    enabled: false,
    query_date: dayjs(today).format("YYYY-MM-DD"),
  });
  const startDate = useQueryString("startDate");
  const endDate = useQueryString("endDate");
  const modal = useQueryString("modal");
  const [error, $error] = useState();
  const [selectedEmails, $selectedEmails] = useState<ValueLabel[]>([]);
  const [emails, $emails] = useState<ValueLabel[]>([]);

  const removeParams = useRemoveParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const { mutate, isLoading: mutateLoading } = reservationMutation();

  const handleEmails = (e: MultiValue<ValueLabel>, item: ActionMeta<ValueLabel>) => {
    if (item.removedValue) $selectedEmails(e as any);
    if (item?.option) $selectedEmails([...selectedEmails, item.option]);
  };

  const { data: userEmails, isLoading: emailsLoading } = useInvitations({ enabled: !!modal });

  const onSubmit = () => {
    const { organizer, description } = getValues();
    mutate(
      {
        start_time: startDate!,
        end_time: endDate!,
        organizer: organizer,
        description,
        ...(!!selectedEmails.length && { invited_users: selectedEmails.map(item => item.value) }),
      },
      {
        onSuccess: (data: any) => {
          refetch();
          reset();
          successToast("Успешно забронировано");
          removeParams(["modal", "endDate", "startDate"]);
          $selectedEmails([]);
        },
        onError: (e: any) => $error(e?.response?.data?.detail),
      },
    );
  };

  useEffect(() => {
    if (!!userEmails?.length)
      $emails(
        userEmails.map(item => {
          return {
            label: item.fullname,
            value: item.email,
          };
        }),
      );
  }, [userEmails]);

  useEffect(() => {
    return () => {
      $error(undefined);
      $selectedEmails([]);
      reset();
    };
  }, [modal]);

  return (
    <Modal isOpen={!!modal} onClose={() => removeParams(["modal"])}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-3 w-96">
        {mutateLoading || emailsLoading ? (
          <Loading absolute />
        ) : (
          <>
            <BaseInput
              label="Организатор мероприятия*"
              labelClassName={"text-black"}
              className="mb-4"
              error={errors.title}>
              <MainInput
                className={"!border-gray-400 text-gray-500"}
                placeholder={"Организатор"}
                register={register("organizer", { required: "Required field" })}
              />
            </BaseInput>

            <BaseInput
              label="Название мероприятия"
              labelClassName={"text-black"}
              className="mb-4"
              error={errors.description}>
              <MainTextArea
                placeholder={"Название"}
                className={"!border-gray-400 text-gray-500"}
                register={register("description")}
              />
            </BaseInput>

            <BaseInput label="Участники" labelClassName={"text-black"}>
              <MultiSelect onChange={handleEmails} options={emails} value={selectedEmails} />
            </BaseInput>

            {!!error && <Alert error={error} />}
            <Bullet className="mt-5 !border-gray-400 " textColor={TextColor.gray} type="submit">
              Отправить
            </Bullet>
          </>
        )}
      </form>
    </Modal>
  );
};

export default BookModal;
