import { IPresenter } from "../../../core/definitions";
import { Chart, ChartPoint } from "../../../core/entities";

export type IChartViewModel = IChartPointViewModel[];
export interface IChartPointViewModel {
  T: number
  USD: number
  BTC?: number
}

class ChartPresenter implements IPresenter<Chart, IChartViewModel> {
  present(model: Chart): IChartViewModel {
    const viewModel: IChartViewModel = model.map((chartPoint) => this.chartPointViewModelFrom(chartPoint));
    return viewModel;
  }

  private chartPointViewModelFrom(chartPoint: ChartPoint) {
    return {
      T: chartPoint.timestamp,
      USD: chartPoint.value.USD
    };
  }
}

export default ChartPresenter;