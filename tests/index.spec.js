import dataFunctions from '../src/data.js';

describe('dataFunctions', () => {

  it('is an object', () => {
    expect(typeof dataFunctions).toBe('object');
  });

  describe('dataFunctions.sortData', () => {

    it('is a function', () => {
      expect(typeof dataFunctions.sortData).toBe('function');
    });
   
    it('Ascending name sorting executed', () => {
      expect(dataFunctions.sortData([{"name":"a"},{"name":"c"},{"name":"b"}], "name", false)).toStrictEqual([{"name":"a"},{"name":"b"},{"name":"c"}]);
    });

    it('Descending name sorting executed', () => {
      expect(dataFunctions.sortData([{"name":"a"},{"name":"c"},{"name":"b"}], "name", true)).toStrictEqual([{"name":"c"},{"name":"b"},{"name":"a"}]);
    });
       
    it('Ascending number sorting executed', () => {
      expect(dataFunctions.sortData([{"num":"1"},{"num":"3"},{"num":"2"}], "num", false)).toStrictEqual([{"num":"1"},{"num":"2"},{"num":"3"}]);
    });

    it('Descending number sorting executed', () => {
      expect(dataFunctions.sortData([{"num":"1"},{"num":"3"},{"num":"2"}], "num", true)).toStrictEqual([{"num":"3"},{"num":"2"},{"num":"1"}]);
    });

  });

  describe('dataFunctions.filterData', () => {

    it('is a function', () => {
      expect(typeof dataFunctions.filterData).toBe('function');
    });
   
    it('Filtro del tipo agua aplicado', () => {
      expect(dataFunctions.filterData([{"type":"planta"},{"type":"fuego"},{"type":"agua"}], "fuego")).toStrictEqual([{"type":"fuego"}]);
    });

    it('Filtro del tipo fuego aplicado', () => {
      expect(dataFunctions.filterData([{"type":"planta"},{"type":"fuego"},{"type":"agua"}], "agua")).toStrictEqual([{"type":"agua"}]);
    });
       
  });

});

