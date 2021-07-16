<script>
    import { FormGroup, Input, Label, Button, Form, Icon } from 'sveltestrap';
    import { auth } from '../../utils/firebase';
    import { user } from '../../store';
    //import { push } from 'svelte-spa-router';
    //import ContainerMedium from '../Lib/ContainerMedium.svelte';
    import Message from '../../lib/Message.svelte';
    import { goto } from '$app/navigation';
    import CustomContainer from '$lib/CustomContainer.svelte';

    let email = '';
    let password = '';
    let message = '';

    const handleLogin = () => {
        message = '';
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                let firebaseUser = userCredentials.user;
                if (firebaseUser) {
                    const {email} = firebaseUser;
                    user.set({...$user, isLoggedIn: true, email});
                    
                    goto('/');
                }
            }).catch((error) => {
                console.log(error.message);
                message = 'Error login: ' + error
            });
    };

    const handleCancel = () => {
        goto('/');
    };
</script>

<style>
    h2 {
        text-align: center;
    }

    .actions {
        text-align: right;
    }
</style>

<CustomContainer size={{ xs: 10, sm:6, md:6, lg:6 }}>
    {#if message}
        <Message>{message}</Message>
    {/if}
    <form on:submit|preventDefault={handleLogin}>
        <h2>Login</h2>

        <FormGroup>
            <Label for="loginEmail">Email</Label>
            <Input 
                type="email"
                name="email"
                bind:value={email}
                id="loginEmail"
                placeholder="Enter email"
            />
        </FormGroup>
        <FormGroup>
            <Label for="loginPassword">Password</Label>
            <Input 
                type="password"
                name="password"
                bind:value={password}
                id="loginPassword"
                placeholder="Enter password"
            />
        </FormGroup>
        <FormGroup>
            <div class="actions">
                <Button type="button" color="light" on:click={handleCancel}>Cancel</Button>
                <Button type="submit">Submit</Button>
            </div>
        </FormGroup>
    </form>
</CustomContainer>