import React, { Fragment } from 'react';
import Pagination, {
    RIGHT_ALIGN,
    LEFT_ALIGN,
    CENTER_ALIGN,
    getAlignClassName,
    createPageButtons
} from 'components/UI/Pagination/Pagination';
import PaginationClasses from 'components/UI/Pagination/Pagination.scss';
import { mount } from 'enzyme';

const getProps = (currentPage, totalPages = 5) => ({
    currentPage,
    totalPages,
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
        expect(paginationItems.length).toEqual(9);

        expect(paginationItems.at(0).find('PaginationLink').props().first).toEqual(true);
        expect(paginationItems.at(1).find('PaginationLink').props().previous).toEqual(true);
        expect(paginationItems.at(7).find('PaginationLink').props().next).toEqual(true);
        expect(paginationItems.at(8).find('PaginationLink').props().last).toEqual(true);
        expect(paginationItems.at(3).props().active).toEqual(true);

        paginationItems.at(4).simulate('click');
        expect(clickedIndex).toEqual(2);
        paginationItems.at(1).simulate('click');
        expect(clickedIndex).toEqual(0);
        paginationItems.at(7).simulate('click');
        expect(clickedIndex).toEqual(2);
        paginationItems.at(0).simulate('click');
        expect(clickedIndex).toEqual(0);
        paginationItems.at(8).simulate('click');
        expect(clickedIndex).toEqual(4);
    });

    it('should only render with next button', () => {
        const component = mount(
            <Pagination { ...getProps(0) } />
        );

        const paginationItems = component.find('PaginationItem');
        expect(paginationItems.length).toEqual(7);

        expect(paginationItems.at(0).find('PaginationLink').props().first).toBeUndefined();
        expect(paginationItems.at(1).find('PaginationLink').props().previous).toBeUndefined();
        expect(paginationItems.at(5).find('PaginationLink').props().next).toEqual(true);
        expect(paginationItems.at(6).find('PaginationLink').props().last).toEqual(true);
        expect(paginationItems.at(0).props().active).toEqual(true);
    });

    it('should only render with previous button', () => {
        const component = mount(
            <Pagination { ...getProps(4) } />
        );

        const paginationItems = component.find('PaginationItem');
        expect(paginationItems.length).toEqual(7);

        expect(paginationItems.at(0).find('PaginationLink').props().first).toEqual(true);
        expect(paginationItems.at(1).find('PaginationLink').props().previous).toEqual(true);
        expect(paginationItems.at(5).find('PaginationLink').props().next).toBeUndefined();
        expect(paginationItems.at(6).find('PaginationLink').props().last).toBeUndefined();
        expect(paginationItems.at(6).props().active).toEqual(true);
    });

    describe('the max number of buttons limit', () => {
        it('is limited when the currentPage is in the middle', () => {
            const component = mount(
                <Pagination { ...getProps(10, 22) } />
            );

            const paginationItems = component.find('PaginationItem');
            expect(paginationItems.length).toEqual(13);
        });

        it('is limited when the currentPage is at the beginning', () => {
            const component = mount(
                <Pagination { ...getProps(0, 22) } />
            );

            const paginationItems = component.find('PaginationItem');
            expect(paginationItems.length).toEqual(7);
        });

        it('is limited when the currentPage is at the end', () => {
            const component = mount(
                <Pagination { ...getProps(21, 22) } />
            );

            const paginationItems = component.find('PaginationItem');
            expect(paginationItems.length).toEqual(7);
        });
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

    describe('creates the correct number of page buttons', () => {
        const onClick = jest.fn();
        const totalPages = 22;

        const mountPageBtns = (currentPage) => mount(
            <Fragment>
                { createPageButtons({ currentPage, totalPages, onClick }) }
            </Fragment>
        );

        beforeEach(() => {
            onClick.mockReset();
        });

        it('current page is first page', () => {
            const pageButtons = mountPageBtns(0);
            expect(pageButtons).toHaveLength(5);
            pageButtons.find('PaginationItem').at(0).simulate('click');
            expect(onClick).toHaveBeenCalledWith(0);
        });

        it('current page is middle page', () => {
            const pageButtons = mountPageBtns(10);
            expect(pageButtons).toHaveLength(9);
            pageButtons.find('PaginationItem').at(0).simulate('click');
            expect(onClick).toHaveBeenCalledWith(6);
        });

        it('current page is last page', () => {
            const pageButtons = mountPageBtns(21);
            expect(pageButtons).toHaveLength(5);
            pageButtons.find('PaginationItem').at(0).simulate('click');
            expect(onClick).toHaveBeenCalledWith(17);
        });
    });
});