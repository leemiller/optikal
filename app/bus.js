var EventBus = new Backbone.Wreqr.EventAggregator();
var ReqresBus = new Backbone.Wreqr.RequestResponse();
module.exports = {
    Event: EventBus,
    Reqres: ReqresBus
};