import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
		<Form onSubmit={(event) => { event.preventDefault(); newTodo({ todo: todo, completed: false, type: type, date: date, desc: desc }) }}>
				<FormGroup>
						<Label>Todo Name</Label>
						<Input type="text" onChange={handleChangeTodo} />
					</FormGroup>
					<FormGroup>
						<Label>Description (optional)</Label>
						<Input type="text" onChange={handleChangeDesc} />
					</FormGroup>
					<FormGroup>
						<Label for="exampleSelect">Todo Type</Label>
						<Input type="select" name="select" id="exampleSelect" onChange={handleChangeType}>
							{todoTypes}
						</Input>
					</FormGroup>
					<FormGroup>
						<Label>Deadline</Label>
						<DateTimePicker onChange={setDate} value={date} />
					</FormGroup>
					<FormGroup>
						<Input type="submit" value="Add New" />
					</FormGroup>
				</Form>        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;