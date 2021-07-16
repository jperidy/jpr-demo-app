<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { Row, Col, Button, Icon } from 'sveltestrap';
    import { fade, fly } from 'svelte/transition';
    import Note from '../Lib/Note.svelte';
    import CustomContainer from '$lib/CustomContainer.svelte';

    let notes = [];

    const getNotes = async () => {
        const res = await fetch('/notes-app/api/notes.json');

        if(res.ok) {
            try {
                const data = await res.json();
                notes = data.notes;
            } catch (error) {
                console.log(error);
            }
        }
    }

    onMount(() => {
        getNotes();
    });

</script>

<style>

</style>

<div in:fade>

    <CustomContainer>
        <h2>Notes: {notes.length}</h2>
    
        <Row>
            <Col class="col text-end">
                <Button color='primary' on:click={() => goto('/notes-app/create')}><Icon name="bookmark-plus" />  Add a note</Button>
            </Col>
        </Row>
    
        <!-- <Row>
            <Col md={3} xs={12}>
                <List 
                    labelName = "Search by category"
                    labelType = "h4"
                    bind:category = {searchCategory}
                    bind:categories = {categories}
                />
            </Col>
        </Row> -->
    
        <div in:fly="{{ y: 200, duration: 2000 }}" out:fade>
            <Row>
                {#each notes as note }
                    <Note note={note} />
                {/each}
            </Row>
        </div>
    </CustomContainer>

</div>