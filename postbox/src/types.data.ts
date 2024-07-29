
type TYearValue = Record<number, number>

export interface ICountryCoffeeData {
  country: string
  total_production: TYearValue
  imports: TYearValue
  exports: TYearValue
  re_exports: TYearValue
  domestic_consumption: TYearValue
  disappearance: TYearValue
  retail_prices: TYearValue
}
