<script>
    import { goto } from '$app/navigation';
    import { Button, Row, Col } from 'sveltestrap';
    export let name = '';
    export let img = 'images/default.jpg';
    export let description = 'This is a new app to...'
    export let url = '/app';
</script>

<style>
    .image-container{
        position: relative;
    }
    .image {
        transition: .5s ease;
        opacity: 1;
        width: 100%;
        height: 100%;
        object-fit: cover;
        backface-visibility: hidden;
        box-shadow: 0 0 5px 5px #888;
    }
    .middle {
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;
    }
    .image-container:hover .image {
        opacity: 0.3;
    }
    .image-container:hover .middle {
        opacity: 1;
    }
    .description {
        min-height: 10vh;
    }
    
</style>

<div class="application-card py-3">
    <Row>
        <Col class='text-center'>
            <h4>{name}</h4>
        </Col>
    </Row>
    <Row>
        <Col class='text-center'>
            <div class="description">"{description}"</div>
        </Col>
    </Row>
    <Row>
        <Col>
            <div class="image-container">
                <div class="box-img p-3">
                    <!-- <img src="images/default.jpg" alt="illustration for application" class="image"> -->
                    <img src={img} alt="illustration for application" class="image">
                </div>
                <div class="middle bg-light">
                    <Button class='p-0' color='light' on:click={() => goto(url)}>
                        <div class="text px-3 py-1 text-dark">Show me</div>
                    </Button>
                </div>
            </div>
        </Col>
    </Row>
</div>