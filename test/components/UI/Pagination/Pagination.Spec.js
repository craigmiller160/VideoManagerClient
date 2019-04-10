import React from 'react';
import Pagination, {
    RIGHT_ALIGN,
    LEFT_ALIGN,
    CENTER_ALIGN,
    getAlignClassName
} from 'components/UI/Pagination/Pagination';
import PaginationClasses from 'components/UI/Pagination/Pagination.scss';
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

        const paginationItems = component.find('PaginationItem');
        expect(paginationItems.length).toEqual(6);

        expect(paginationItems.at(0).find('PaginationLink').props().previous).toEqual(true);
        expect(paginationItems.at(5).find('PaginationLink').props().next).toBeUndefined();
        expect(paginationItems.at(5).props().active).toEqual(true);
    });

    it('getAlignClassName returns the correct class name', () => {
        let className = getAlignClassName(LEFT_ALIGN);
        expect(className).toEqual(PaginationClasses.left);

        className = getAlignClassName(CENTER_ALIGN);
        expect(className).toEqual(PaginationClasses.center);

        className = getAlignClassName(RIGHT_ALIGN);
        expect(className).toEqual(PaginationClasses.right);

        try {
            getAlignClassName('foobar');
        }
        catch (ex) {
            return;
        }
        throw new Error('Should have thrown exception');
    });
});