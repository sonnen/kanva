# Data Container

DataContainer is a core element of creating all charts. It processes the data and scales it appropriately across all data series with regard of chart dimensions. 

## AxisParameters

An object that consists of:

* `tickCount` - number of labels to display, if not present, will default to the total number of elements
* `roundTo` - tick values will be rounded to these values
* `labelAccessor` - function that generates text for the label
* `useApproximateValues` - when true, `roundTo` & `isGrouped` parameters aren't taken into account and labels are generated
* `isGrouped` - displays labels under groups in `BarChart`
