<script>
    import { Row, Col, Button, Card, CardBody, CardHeader, CardTitle, CardText, CardSubtitle, Icon } from 'sveltestrap';
    import { goto } from '$app/navigation';
    
    export let note;

    const handleEdit = (id) => {
        goto(`/notes-app/create/${id}`);
    };

    function typewriter(node, { speed = 50 }) {
        const valid = (
            node.childNodes.length === 1 &&
            node.childNodes[0].nodeType === Node.TEXT_NODE
        );

        if (!valid) {
            throw new Error(`This transition only works on elements with a single text node child`);
        }

        const text = node.textContent;
        const duration = text.length * speed;

        return {
            duration,
            tick: t => {
                const i = ~~(text.length * t);
                node.textContent = text.slice(0, i);
            }
        };
    }
</script>

<Col md={3} xs={12}>
    <Card class="my-3">
        <CardHeader>
            <CardTitle>
                <Row>
                    <Col>
                        {note.title.toUpperCase()}
                    </Col>
                    <Col class='text-right'>
                        {note.date}
                    </Col>
                </Row>
            </CardTitle>
        </CardHeader>
        <CardBody>
            <CardSubtitle><Icon name="circle-fill" class="text-{note.category.color}"/>  {note.category.value}</CardSubtitle>
            <CardText><p in:typewriter>{note.body}</p></CardText>
            <Button on:click={handleEdit(note.id)}>Edit</Button>
        </CardBody>
    </Card>
</Col>