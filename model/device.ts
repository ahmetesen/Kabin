export default class Device{
    expoV:string|undefined;
    osV:string|undefined;
    os:string|undefined;
    d:string|undefined;
    dId:string|undefined;
    appV:string|undefined;
    t:string|undefined;
    date:Date|undefined;
    uid:string|undefined;
    l:string|undefined;
    all():string{
        return this.dId+'\n'+
        this.uid+'\n'+
        this.t+'\n'+
        this.d+'\n'+
        this.os+'\n'+
        this.osV+'\n'+
        this.appV+'\n'+
        this.expoV+'\n'+
        this.l+'\n'+
        this.date;
    };
}