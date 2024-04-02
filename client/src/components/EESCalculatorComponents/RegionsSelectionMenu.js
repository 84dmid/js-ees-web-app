import React, { useState, useContext, useEffect } from 'react';
import { Form, Modal, Pagination } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { AppContext } from '../AppContext';

const RegionSelectionMenu = observer(({ isBigMenu = false }) => {
    const { EESCalculator, catalog } = useContext(AppContext);
    const [activeChar, setActiveChar] = useState(
        EESCalculator.regionName?.charAt().toUpperCase() || ''
    );

    useEffect(() => {
        setActiveChar(EESCalculator.regionName?.charAt().toUpperCase() || '');
    }, [EESCalculator.regionName]);

    useEffect(() => {
        if (isBigMenu) {
            if (!catalog.regionId) return;
            EESCalculator.regionId = catalog.regionId;
        } else {
            EESCalculator.regionId = catalog.regionId;
        }
    }, []);

    const handleChangeRegion = (id, name) => {
        EESCalculator.regionId = id;
        setActiveChar(name.charAt().toUpperCase());
    };

    const bigSelectMenu = (regions) => {
        const regionsList = [];
        const productionRegions = regions.filter(
            (region) => region.isProduction === true
        );

        const firstChars = new Set();
        productionRegions.forEach((region) => {
            firstChars.add(region.name.charAt().toUpperCase());
        });

        const sortedFirstChars = Array.from(firstChars).sort();
        const paginationList = sortedFirstChars.map((char) => (
            <Pagination.Item
                key={char + 'pagination'}
                active={EESCalculator.regionName?.charAt() === char}
                onClick={() => setActiveChar(char)}
            >
                {char}
            </Pagination.Item>
        ));

        regionsList.push(
            <Pagination size="sm" key="pagination" className="d-flex flex-wrap ">
                {paginationList}
            </Pagination>
        );
        regionsList.push(
            <p key="regionHeader" className="mb-3">
                Выберите регион расположения участка изысканий:
            </p>
        );

        (activeChar ? [activeChar] : sortedFirstChars).forEach((char) => {
            const regionsGroup = [];
            regionsGroup.push(
                <p style={{ fontSize: '1.1em' }} className="mt-3 mb-2" key={char}>
                    <b>{char}</b>
                </p>
            );
            productionRegions
                .filter((region) => region.name.charAt().toUpperCase() === char)
                .forEach((region) => {
                    regionsGroup.push(
                        <Form.Check
                            type="radio"
                            key={region.id}
                            id={region.id + 'region'}
                            label={region.name}
                            checked={region.id === EESCalculator.regionId}
                            onChange={() => handleChangeRegion(region.id, region.name)}
                        />
                    );
                });
            regionsList.push(<div key={char + 'regionGroup'}>{regionsGroup}</div>);
        });
        return regionsList;
    };

    const [showMenu, setShowMenu] = useState(false);

    const handleHideMenu = () => {
        setShowMenu(false);
    };

    const openMenu = () => {
        setShowMenu(true);
    };

    useEffect(() => {
        if (!EESCalculator.regionId) return;
        setShowMenu(false);
    }, [EESCalculator.regionId]);

    const littleSelectMenu = () => {
        return (
            <>
                <Form.Label htmlFor="regionSelectMenu">
                    Выберите регион расположения участка изысканий:
                </Form.Label>
                <Form.Control
                    style={{ caretColor: 'transparent' }}
                    className="form-select"
                    id="regionSelectMenu"
                    value={EESCalculator.regionName || ''}
                    onChange={openMenu} // без этого костыля вылазит ошибка и нельзя  onClick без readOnly, а с readOnly  не работает  required
                    autoComplete="off"
                    onClick={openMenu}
                    required
                />

                <Modal show={showMenu} onHide={handleHideMenu}>
                    <Modal.Header closeButton>
                        <Modal.Title>Меню выбора региона</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{bigSelectMenu(EESCalculator.initRegions)}</Modal.Body>
                </Modal>
            </>
        );
    };

    return (
        <>
            {isBigMenu && bigSelectMenu(EESCalculator.initRegions)}
            {isBigMenu || littleSelectMenu(EESCalculator.initRegions)}
        </>
    );
});

export default RegionSelectionMenu;
