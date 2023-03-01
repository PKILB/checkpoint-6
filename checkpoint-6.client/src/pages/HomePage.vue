<template>
  <div class="container-fluid">
    <div class="row text-light my-3">
      <div class="col-12 bg-image">
        <div class="row ms-3">
          <div class="col-12 my-5 fs-4">
            <div class="mb-3">
              Tired of all those scalping nerds?
            </div>
            <div class="mb-3">
              Reserve your spot NOW with
            </div>
            <div class="mb-3">
              real events with true nerds.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12 m-auto">
        <div class="types-color p-3 d-flex justify-content-around">
          <button class="btn btn-outline-light">Concert</button>
          <button class="btn btn-outline-light">Convention</button>
          <button class="btn btn-outline-light">Digital</button>
          <button class="btn btn-outline-light">Sport</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 m-auto">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.bg-image {
  background-image: url(https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnQlMjBzZWF0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60);
  object-fit: cover;
}



.types-color {
  background-color: #383b46;
}
</style>
