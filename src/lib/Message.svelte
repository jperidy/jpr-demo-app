<script>
    import { Alert, Icon } from 'sveltestrap';
    export let type = 'warning';
</script>

<Alert color={type}>
    <Icon name="chat-text-fill" />  <slot></slot>
</Alert>