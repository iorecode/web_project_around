export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderList = data;
    this._renderMethod = renderer;
    this._renderContainer = containerSelector;
  }

  _clearContainer() {
    this._renderContainer.innerHTML = "";
  }

  renderItem() {
    this._clearContainer();
    this._renderList.forEach((i) => {
      this._renderMethod(i);
    });
  }

  setItem(i) {
    this._renderContainer.prepend(i);
  }
}
