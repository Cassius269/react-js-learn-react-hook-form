import { useForm } from "react-hook-form";

function UserForm() {
  const { register, getValues, watch, handleSubmit } = useForm();
  // Surveiller toutes les valeurs du formulaire et les afficher
  watch();
  console.log(getValues());

  // Fonction pour gérer la soumission de formulaire
  function submit(values) {
    console.log(values); // afficher les valeurs de champs
  }

  return (
    <>
      <form action="#" method="POST" onSubmit={handleSubmit(submit)}>
        <div>
          <label className="form-label" htmlFor="firstname">
            Prénom
          </label>
          <input
            className="form-control"
            id="firstname"
            type="text"
            name="firstname"
            {...register("firstname")}
          />
        </div>
        <div className="mt-2">
          <label className="form-label" htmlFor="firstname">
            Nom de famillle
          </label>
          <input
            className="form-control"
            id="lastname"
            type="text"
            name="lastname"
            {...register("lastname")}
          />
        </div>
        <input
          className="btn btn-primary mt-3"
          type="submit"
          value={"Sauvegarder"}
        />
      </form>
    </>
  );
}

export default UserForm;
