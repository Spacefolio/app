// eslint-disable-next-line @typescript-eslint/ban-types
interface IPresenter<Model = {}, ViewModel = {}> {
  present(model: Model): ViewModel;
}

export default IPresenter;