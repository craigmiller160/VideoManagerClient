import newid from 'utils/newid';

describe('newId', () => {
    it('generates an incrementing ID', () => {
        let id = newid();
        expect(id).toEqual('id_0');
        id = newid();
        expect(id).toEqual('id_1');
        id = newid();
        expect(id).toEqual('id_2');
    });
});