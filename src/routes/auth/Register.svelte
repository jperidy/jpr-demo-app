<script>
    import { FormGroup, Input, Label, Button, Form } from 'sveltestrap';
    import { auth } from '../../utils/firebase';
    import { user } from '../../store';
    import { goto } from '$app/navigation';
    import CustomContainer from '$lib/CustomContainer.svelte';

    let email = '';
    let password = '';

    const handleSignup = () => {
        auth.createUserWithEmailAndPassword(email, password).then((userCredentials) => {
            let firebaseUser = userCredentials.user;

            if (firebaseUser) {
                const { email } = firebaseUser;
                user.set({...$user, isLoggedIn: true, email});

                goto('/');
            }
        }).catch((error) => {
            console.log(error.message);
        });
    };

    const handleCancel = () => {
        push('/');
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
    <form on:submit|preventDefault={handleSignup}>
        <h2>Register</h2>

        <FormGroup>
            <Label for="registerEmail">Email</Label>
            <Input 
                type="email"
                name="email"
                bind:value={email}
                id="registerEmail"
                placeholder="Enter email"
            />
        </FormGroup>
        <FormGroup>
            <Label for="registerPassword">Password</Label>
            <Input 
                type="password"
                name="password"
                bind:value={password}
                id="registerPassword"
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