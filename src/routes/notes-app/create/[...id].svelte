<script>
    import { onMount } from 'svelte';
    import { FormGroup, Input, Button, Label, Icon } from 'sveltestrap';
    import { goto } from '$app/navigation';
    import { db } from '../../../utils/firebase';
    import CustomContainer from '../../../lib/CustomContainer.svelte';
    import List from '../../../lib/List.svelte';
    import { page } from "$app/stores";

    let title = '';
    let body = '';
    let date = '';
    let category = {};
    let categories = [
        {value: 'cat1', color: 'primary'}, 
        {value: 'cat2', color: 'secondary'},
        {value: 'cat3', color: 'warning'}
    ];

    let params = $page.params;

    let errorAction = '';

    onMount(() => {

        if (params.id) {
            db.collection('notes').doc(params.id).get().then((doc) => {
                if (doc.exists) {
                    title = doc.data().title;
                    body = doc.data().body;
                    date = doc.data().date;
                    category = doc.data().category;
                } else {
                    console.log("No such document!");
                    errorAction = `Note with id: ${params.id} not found`;
                }
            }).catch(error => {
                console.log("Error getting document:", error);
                errorAction = "Error getting document: " + error;
            });
        }
    });

    const handleSubmit = async () => {
        errorAction = '';
        if (params.id) {
            try {
                await db.collection('notes').doc(params.id).update({
                    title,
                    body,
                    date,
                    category
                });
                goto('/notes-app')
            } catch (error) {
                errorAction = 'Error update: ' + error;
                console.log(error);
            }
        } else {
            try {
                await db.collection('notes').doc().set({
                    title,
                    body,
                    date,
                    category
                });
                goto('/notes-app');
            } catch (error) {
                errorAction = 'Error create: ' + error;
                console.log(error);   
            }
        }
    };

    const handleCancel = () => {
        title = "";
        body = "";
        date = "";
        category = {};

        goto('/notes-app');
    };

</script>

{#if errorAction}
    <Icon name="exclamation-triangle-fill" class="text-danger"/>  <span class="text-danger">{errorAction}</span>
{/if}

<CustomContainer>
    <form on:submit|preventDefault={handleSubmit}>
        <FormGroup>
            <Label class="h4">Title</Label>
            <Input type="text" bind:value={title} />
        </FormGroup>

        <FormGroup>
            <Label class="h4">Date</Label>
            <Input type="date" bind:value={date} />
        </FormGroup>

        <List 
            labelName = "Category"
            labelType = "h4"
            bind:category = {category}
            categories = {categories}
        />
                
        <FormGroup>        
            <Label class="h4">Body</Label>
            <Input type="textarea" bind:value={body} />       
        </FormGroup>

        <FormGroup>
            <Button type="button" color="light" on:click={handleCancel}>Cancel</Button>
            {#if params.id}
                <Button type="submit" color="primary">Update</Button>
            {:else}
                <Button type="submit" color="primary">Create</Button>
            {/if}
                
        </FormGroup>        
    </form>
</CustomContainer>