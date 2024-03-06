import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Card, ListGroup } from 'react-bootstrap';
import CardInfo from "../dto/model";
import useFetch from '../hooks/useFetch';

function TodoApp() {
    // const [todoList, setTodoList] = useState<CardInfo[]>([]);
    const [title, setTitle] = useState("");
    const [id, setId] = useState(1);
    const [isPending, setIsPending] = useState(false)

    const [todoList, setTodoList]= useFetch("http://localhost:8000/todos")
    // setTodoList(data)
    // useEffect(() => {
    //     fetch("http://localhost:8000/todos")

    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res);
    //             setTodoList(res);
    //             setIsPending(false);
    //         })
    // },[])
    const addTodoData = () => {
        if (title === "") {
            return;
        }
        const cardInfo: CardInfo = { title, isComplete: false, id };
        setId(id + 1);
        setTodoList(todoList => [...todoList, cardInfo]);
        setTitle(""); // Clear input after adding
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const checkChange = (id: number) => {
        setTodoList(todoList.map(todo => {
            if (todo.id === id) {
                return { ...todo, isComplete: !todo.isComplete };
            }
            return todo;
        }));
    };

    const deleteElement = (id: number) => {
        setTodoList(todoList.filter(todo => todo.id !== id));
    };

    return (

        <Container className='d-flex-direction-column justify-content-center align-items-center margin-top' style={{ width: '800px' }}>
            {isPending && <div>Loading....</div>}
            {!isPending &&
                <div>
                    <div className="d-flex justify-content-center align-items-center" >
                        <Card style={{ width: '800px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Card.Body>
                                <Card.Title className="text-center">Todo App</Card.Title>
                                <Form className="text-center" onSubmit={e => { e.preventDefault(); addTodoData(); }}>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="Title"
                                            value={title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <div className="mt-3 d-flex " >
                                    <Button className="mt-3 d-flex " type="submit" variant="primary" ><h5  style={{marginRight:10}}>+</h5> Todo</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="mt-3" style={{ width: '800px' }}>
                        <h3>Todo List</h3>
                        <ListGroup>
                            {todoList.map(todo => (
                                !todo.isComplete &&
                                <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
                                    <Form.Check
                                            type="checkbox"
                                            checked={todo.isComplete}
                                            onChange={() => checkChange(todo.id)}
                                        />
                                    {todo.title}
                                    <div>

                                        <Button variant="secondary" size="sm" onClick={() => deleteElement(todo.id)}>Delete</Button>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                    <div className="mt-3" style={{ width: '800px' }}>
                        <h3 className="mt-3">Completed Tasks</h3>
                        <ListGroup>
                            {todoList.map(todo => (
                                todo.isComplete &&
                                <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
                                    {todo.title}
                                    <div>
                                        <Form.Check
                                            type="checkbox"
                                            checked={todo.isComplete}
                                            onChange={() => checkChange(todo.id)}
                                        />
                                        <Button variant="secondary" size="sm" onClick={() => deleteElement(todo.id)}>Delete</Button>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </div>
            }
        </Container>
    );
}

export default TodoApp;
