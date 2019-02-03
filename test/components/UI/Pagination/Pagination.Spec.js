import React from 'react';
import Pagination, { RIGHT_ALIGN } from '../../../../src/components/UI/Pagination/Pagination';
import { mount } from 'enzyme';

const getProps = (currentPage) => ({
    currentPage,
    totalPages: 5,
    align: RIGHT_ALIGN
});

describe('Pagination', () => {
    it('should render correctly', () => {
        let clickedIndex = -1;
        const clickHandler = (index) => {
            clickedIndex = index;
        };

        const component = mount(
            <Pagination
                { ...getProps(1) }
                onClick={ clickHandler }
            />
        );
        expect(component).toMatchSnapshot();

        const paginationRoot = component.find('Pagination[tag="nav"]');
        expect(paginationRoot.hasClass('Pagination')).toEqual(true);
        expect(paginationRoot.hasClass('right')).toEqual(true);

        const paginationItems = component.find('PaginationItem');
        expect(paginationItems.length).toEqual(7);

        expect(paginationItems.at(0).find('PaginationLink').props().previous).toEqual(true);
        expect(paginationItems.at(6).find('PaginationLink').props().next).toEqual(true);
        expect(paginationItems.at(2).props().active).toEqual(true);

        paginationItems.at(3).simulate('click', {});
        expect(clickedIndex).toEqual('2');
        paginationItems.at(0).simulate('click', {});
        expect(clickedIndex).toEqual('<');
        paginationItems.at(6).simulate('click', {});
        expect(clickedIndex).toEqual('>');
    });

    it('should only render with next button', () => {
        const component = mount(
            <Pagination { ...getProps(0) } />
        );
        expect(component).toMatchSnapshot();

        const paginationItems = component.find('PaginationItem');
        expect(paginationItems.length).toEqual(6);

        expect(paginationItems.at(0).find('PaginationLink').props().previous).toBeUndefined();
        expect(paginationItems.at(5).find('PaginationLink').props().next).toEqual(true);
        expect(paginationItems.at(0).props().active).toEqual(true);
    });

    it('should only render with previous button', () => {
        const component = mount(
            <Pagination { ...getProps(4) } />
        );
        expect(component).toMatchSnapshot();

        const paginationItems = component.find('PaginationItem');
        expect(paginationItems.length).toEqual(6);

        expect(paginationItems.at(0).find('PaginationLink').props().previous).toEqual(true);
        expect(paginationItems.at(5).find('PaginationLink').props().next).toBeUndefined();
        expect(paginationItems.at(5).props().active).toEqual(true);
    });
});