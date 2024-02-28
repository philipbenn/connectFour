// Controller
class ConnectFourController {
    constructor(rows, cols, containerId) {
      this.model = new ConnectFourModel(rows, cols);
      this.view = new ConnectFourView(this.model, containerId);
    }
  }
  