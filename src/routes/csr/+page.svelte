<script>
  import PocketBase from "pocketbase";
  import { enhance } from "$app/forms";
  const pb = new PocketBase("http://127.0.0.1:8090");

  async function handleFormSubmit(event) {
    event.preventDefault();

    const files = event.target.elements.file.files;

    if (files.length === 0) {
      alert("No files provided");
      return;
    }

    const promises = [];

    for (let file of files) {
      if (file.size === 0) {
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);

      const fetchOptions = {
        method: "POST",
        body: formData,
      };

      promises.push(
        pb.collection("documents").create(formData, { requestKey: null })
      );
    }

    try {
      await Promise.all(promises);
    } catch (error) {
      console.error(error);
    }

    console.log("yeah");
  }
</script>

<h1>THIS IS CSR</h1>
<form on:submit={handleFormSubmit} enctype="multipart/form-data" use:enhance>
  <input id="file" name="file" type="file" multiple />
  <button type="submit">Create</button>
</form>
