import React, { useState } from 'react';
import { Button, ButtonGroup, Form, FloatingLabel } from 'react-bootstrap';

import {
    updateCategory,
    moveUpCategory,
    moveDownCategory,
    deleteCategory,
    createSubcategory,
} from '../http/catalogAPI.js';
import SubcategoryItemEditor from './SubcategoryItemEditor.js';
import DeletingModalWindow from './DeletingModalWindow.js';

const CategoryItemEditor = ({
    id,
    order,
    name,
    subcategories,
    setCatalogEditingToggle,
    filter,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [category, setCategory] = useState({ name });
    const [showDeletingWindow, setShowDeletingWindow] = useState(false);

    const subcategoryList = subcategories.map((subcategory) => {
        return (
            <SubcategoryItemEditor
                key={subcategory.id + 'subcategory'}
                id={subcategory.id}
                name={subcategory.name}
                surveys={subcategory.surveys}
                order={subcategory.order}
                setCatalogEditingToggle={setCatalogEditingToggle}
                categoryId={id}
                filter={filter}
            />
        );
    });

    const getForm = (type, key, label) => {
        return (
            <FloatingLabel label={label}>
                <Form.Control
                    type={type}
                    value={category[key]}
                    onChange={(event) => {
                        setCategory({ ...category, [key]: event.target.value });
                    }}
                />
            </FloatingLabel>
        );
    };

    const handleEditClick = () => {
        if (isEdit) {
            setIsEdit(false);
            updateCategory(id, category)
                .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
                .catch((error) => console.error(`Category updating error: ${error}`));
        } else {
            setIsEdit(true);
        }
    };

    const deleteCategoryCallback = () => {
        deleteCategory(id)
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Category deleting error: ${error}`));
    };

    const handleDeleteClick = (event) => {
        if (isEdit) return;
        setShowDeletingWindow(true);
    };

    const moveUp = () => {
        moveUpCategory(id)
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Category moving up error: ${error}`));
    };

    const moveDown = () => {
        moveDownCategory(id)
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Category moving down error: ${error}`));
    };

    const handleCreateClick = () => {
        createSubcategory({ categoryId: id, name: 'new subcategory' })
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Subcategory creating error: ${error}`));
    };

    return (
        <>
            <DeletingModalWindow
                show={showDeletingWindow}
                setShow={setShowDeletingWindow}
                deleteFunction={deleteCategoryCallback}
                text={`Подтвердите удаление категории: "${name}"`}
            />
            <tr className="table-secondary">
                <td className="align-middle"></td>
                <td className="align-middle">
                    <ButtonGroup size="sm">
                        <Button onClick={moveDown} variant="outline-secondary">
                            ↓
                        </Button>
                        <Button onClick={moveUp} variant="outline-secondary">
                            ↑
                        </Button>
                    </ButtonGroup>
                </td>
                <td colSpan={4} className="align-middle">
                    {isEdit ? (
                        getForm('text', 'name', 'Категория')
                    ) : (
                        <>
                            <div style={{ fontSize: '0.875em' }}>Категория</div>
                            <h5>{category.name}</h5>
                        </>
                    )}
                </td>
                <td className="align-middle text-end">
                    <ButtonGroup size="sm" className="w-100">
                        <Button
                            onClick={handleCreateClick}
                            size="sm"
                            variant="outline-primary"
                        >
                            ➕
                        </Button>
                        <Button variant="outline-primary" onClick={handleEditClick}>
                            {isEdit ? <>💾</> : <>✏️</>}
                        </Button>
                        <Button variant="outline-danger" onClick={handleDeleteClick}>
                            ❌
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
            {filter.isSubcategoriesHidden || subcategoryList}
        </>
    );
};

export default CategoryItemEditor;
