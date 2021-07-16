<script>
    import Nav from '$lib/Nav.svelte';
    import Footer from '$lib/Footer.svelte';
    //import 'bootstrap/dist/css/bootstrap.min.css';
    import '../bootstrap.min.css';
</script>

<style>
    .body{
        min-height: 80vh;
    }
    .footer{
        margin-top: 20px;
    }
</style>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css">
</svelte:head>

<Nav></Nav>
<div class="body mt-5">
<slot></slot>
</div>
<div class='footer'>
    <Footer></Footer>
</div>
