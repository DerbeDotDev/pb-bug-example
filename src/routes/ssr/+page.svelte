<script>
	import { enhance } from '$app/forms';
</script>

<h1>THIS IS SSR</h1>
<form action="?/create" method="POST" enctype="multipart/form-data" use:enhance>
	<input id="file" name="file" type="file" multiple />
	<button type="submit">Create</button>
</form>
