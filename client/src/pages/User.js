import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const User = () => {
    const [data, setData] = useState({ id: 1, name: 'John', age: 25 });

    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = (id) => {
        setIsEdit((prevState) => (prevState ? false : true));
    };

    const handleSave = (id) => {
        setData((prevData) => {
            return { ...prevData, name: user.name };
        });
        setIsEdit(!isEdit);
    };

    const user = { name: data.name };

    console.log(data.name);

    return (
        <>
            <div>User</div>
            <Table striped bordered hover responsive>
                <tbody>
                    <tr key={data.id}>
                        <td>{data.id}</td>
                        <td
                            className={!isEdit ? '' : 'table-primary'}
                            // className="form-control"
                            contentEditable={isEdit}
                            onInput={(e) => (user.name = e.currentTarget.innerText)}
                            suppressContentEditableWarning={true}
                        >
                            {isEdit ? user.name : data.name}
                        </td>
                        <td>
                            {isEdit ? (
                                <>
                                    <Button
                                        onClick={() => {
                                            console.log(user.name);
                                            handleSave(data.id);
                                        }}
                                    >
                                        Save
                                    </Button>
                                    <Button onClick={() => handleEdit(data.id)}>
                                        Exit
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={() => handleEdit(data.id)}>Edit</Button>
                            )}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};

export default User;
