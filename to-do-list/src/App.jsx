import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import './App.css'; // Import custom CSS for styling

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editingTask, setEditingTask] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [editingDate, setEditingDate] = useState('');
  const [editingTime, setEditingTime] = useState('');
  const [editingColor, setEditingColor] = useState('#ffffff'); // Editing color state
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskColor, setTaskColor] = useState('#ffffff'); // Default color is white

  // Refs for input fields
  const taskNameRef = useRef(null);
  const taskDescriptionRef = useRef(null);
  const taskDateRef = useRef(null);
  const taskTimeRef = useRef(null);

  const handleShowForm = () => {
    if (editingTaskIndex !== null) {
      handleSaveEditTask();
    }
    setShowForm(true);
  };

  const handleHideForm = () => setShowForm(false);

  const handleTaskNameChange = (e) => setTaskName(e.target.value);
  const handleTaskDescriptionChange = (e) => setTaskDescription(e.target.value);
  const handleTaskDateChange = (e) => setTaskDate(e.target.value);
  const handleTaskTimeChange = (e) => setTaskTime(e.target.value);
  const handleTaskColorChange = (color) => setTaskColor(color); // Update color

  const handleAddTask = () => {
    if (taskName.trim() && taskDescription.trim() && taskDate.trim() && taskTime.trim()) {
      if (editingTaskIndex !== null) {
        handleSaveEditTask();
      }
      setTasks([
        ...tasks,
        { name: taskName, description: taskDescription, date: taskDate, time: taskTime, color: taskColor }
      ]);
      setTaskName('');
      setTaskDescription('');
      setTaskDate('');
      setTaskTime('');
      setTaskColor('#ffffff'); // Reset color
      setShowForm(false);
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleEditTask = (index) => {
    setEditingTaskIndex(index);
    setEditingTask(tasks[index].name);
    setEditingDescription(tasks[index].description);
    setEditingDate(tasks[index].date);
    setEditingTime(tasks[index].time);
    setEditingColor(tasks[index].color); // Set color for editing
  };

  const handleSaveEditTask = () => {
    const newTasks = tasks.map((task, i) =>
      i === editingTaskIndex
        ? {
            ...task,
            name: editingTask,
            description: editingDescription,
            date: editingDate,
            time: editingTime,
            color: editingColor // Save updated color
          }
        : task
    );
    setTasks(newTasks);
    setEditingTaskIndex(null);
    setEditingTask('');
    setEditingDescription('');
    setEditingDate('');
    setEditingTime('');
    setEditingColor('#ffffff'); // Reset color
  };

  const handleCancelEdit = () => {
    setEditingTaskIndex(null);
    setEditingTask('');
    setEditingDescription('');
    setEditingDate('');
    setEditingTime('');
    setEditingColor('#ffffff'); // Reset color
  };

  // Function to handle Enter key to move to the next input
  const handleKeyDown = (e, nextInputRef) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      nextInputRef.current.focus(); // Focus the next input field
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center mb-4 text-primary">To-Do List</h1>
          {!showForm ? (
            <Button
              variant="primary"
              className="w-100 shadow-sm mb-4 rounded-pill custom-button"
              onClick={handleShowForm}
            >
              Create Task
            </Button>
          ) : (
            <Form className="bg-light p-4 rounded">
              <Form.Group controlId="formTaskName" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Task Name"
                  value={taskName}
                  onChange={handleTaskNameChange}
                  ref={taskNameRef}
                  onKeyDown={(e) => handleKeyDown(e, taskDescriptionRef)}
                  className="shadow-sm rounded-pill"
                />
              </Form.Group>
              <Form.Group controlId="formTaskDescription" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Task Description"
                  value={taskDescription}
                  onChange={handleTaskDescriptionChange}
                  ref={taskDescriptionRef}
                  onKeyDown={(e) => handleKeyDown(e, taskDateRef)}
                  className="shadow-sm rounded-pill"
                />
              </Form.Group>
              <Form.Group controlId="formTaskDate" className="mb-3">
                <Form.Control
                  type="date"
                  value={taskDate}
                  onChange={handleTaskDateChange}
                  ref={taskDateRef}
                  onKeyDown={(e) => handleKeyDown(e, taskTimeRef)}
                  className="shadow-sm rounded-pill"
                />
              </Form.Group>
              <Form.Group controlId="formTaskTime" className="mb-3">
                <Form.Control
                  type="time"
                  value={taskTime}
                  onChange={handleTaskTimeChange}
                  ref={taskTimeRef}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTask(); // Trigger adding the task on Enter
                    }
                  }}
                  className="shadow-sm rounded-pill"
                />
              </Form.Group>
              <Form.Group controlId="formTaskColor" className="mb-3">
                <Form.Label>Choose Color</Form.Label>
                <div>
                  <Button
                    variant="danger"
                    className="me-2"
                    onClick={() => handleTaskColorChange('#ff0000')}
                  >
                    Red
                  </Button>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleTaskColorChange('#0000ff')}
                  >
                    Blue
                  </Button>
                  <Button
                    variant="success"
                    className="me-2"
                    onClick={() => handleTaskColorChange('#00ff00')}
                  >
                    Green
                  </Button>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleTaskColorChange('#ffff00')}
                  >
                    Yellow
                  </Button>
                </div>
              </Form.Group>
              <Button
                variant="success"
                className="w-100 shadow-sm mb-2 rounded-pill custom-button"
                onClick={handleAddTask}
              >
                Save Task
              </Button>
              <Button
                variant="secondary"
                className="w-100 shadow-sm rounded-pill custom-button"
                onClick={handleHideForm}
              >
                Cancel
              </Button>
            </Form>
          )}
          <ListGroup className="mt-4">
            {tasks.map((task, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center rounded mb-2"
                style={{
                  borderColor: task.color,
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  backgroundColor: '#f8f9fa' // Maintain background color
                }} // Set border color dynamically
              >
                {editingTaskIndex === index ? (
                  <>
                    <Form.Control
                      type="text"
                      value={editingTask}
                      onChange={(e) => setEditingTask(e.target.value)}
                      className="me-2 mb-2 rounded-pill"
                      placeholder="Edit Task Name"
                    />
                    <Form.Control
                      type="text"
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                      className="me-2 mb-2 rounded-pill"
                      placeholder="Edit Description"
                    />
                    <Form.Control
                      type="date"
                      value={editingDate}
                      onChange={(e) => setEditingDate(e.target.value)}
                      className="me-2 mb-2 rounded-pill"
                    />
                    <Form.Control
                      type="time"
                      value={editingTime}
                      onChange={(e) => setEditingTime(e.target.value)}
                      className="me-2 mb-2 rounded-pill"
                    />
                    <Form.Label>Choose Color</Form.Label>
                    <div>
                      <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => setEditingColor('#ff0000')}
                      >
                        Red
                      </Button>
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => setEditingColor('#0000ff')}
                      >
                        Blue
                      </Button>
                      <Button
                        variant="success"
                        className="me-2"
                        onClick={() => setEditingColor('#00ff00')}
                      >
                        Green
                      </Button>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => setEditingColor('#ffff00')}
                      >
                        Yellow
                      </Button>
                    </div>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={handleSaveEditTask}
                      className="me-2 custom-button"
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleCancelEdit}
                      className="custom-button"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <div>
                      <strong style={{ color: task.color }}>{task.name}</strong>
                      <p>{task.description}</p>
                      <small>{task.date} at {task.time}</small>
                    </div>
                    <div>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEditTask(index)}
                        className="me-2 custom-button"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteTask(index)}
                        className="custom-button"
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
