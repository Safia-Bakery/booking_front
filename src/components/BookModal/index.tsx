import { TextColor } from "src/components/Typography";
import BaseInput from "src/components/BaseInputs";
import Bullet from "src/components/Bullet";
import useReservations from "src/hooks/useReservations";
import Modal from "src/components/Modal";
import MainInput from "src/components/BaseInputs/MainInput";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import { useForm } from "react-hook-form";
import reservationMutation from "src/hooks/mutation/reservationMutation";
import { successToast } from "src/utils/toast";
import { ActionMeta, MultiValue } from "react-select";
import { ValueLabel } from "src/utils/types";
import MultiSelect from "src/components/BaseInputs/MultiSelect";
import Loading from "src/components/Loader";
import useInvitations from "src/hooks/useInvitations";
import { useState } from "react";
import useQueryString from "src/hooks/custom/useQueryString";
import { useRemoveParams } from "src/hooks/custom/useCustomNavigate";

const BookModal = () => {
  const { refetch } = useReservations({});
  const startDate = useQueryString("startDate");
  const endDate = useQueryString("endDate");
  const modal = useQueryString("modal");

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
    if (item.removedValue) $selectedEmails(e.map(item => item.value));
    if (item?.option) $selectedEmails([...selectedEmails, item.option.value]);
  };

  const { data: userEmails } = useInvitations({});
  const [selectedEmails, $selectedEmails] = useState<string[]>([]);

  const onSubmit = () => {
    const { organizer, description } = getValues();
    mutate(
      {
        start_time: startDate!,
        end_time: endDate!,
        organizer: organizer,
        description,
      },
      {
        onSuccess: () => {
          successToast("Успешно забронировано");
          refetch();
          reset();
          removeParams(["modal"]);
          $selectedEmails([]);
        },
      },
    );
  };

  return (
    <Modal isOpen={!!modal} onClose={() => removeParams(["modal"])}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-3 w-96">
        {mutateLoading ? (
          <Loading />
        ) : (
          <>
            <BaseInput
              label="Организатор мероприятия"
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
              <MultiSelect onChange={handleEmails} options={userEmails} />
            </BaseInput>
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
