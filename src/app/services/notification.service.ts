import {Injectable} from '@angular/core';

@Injectable()
export class NotificationService {

    constructor() {
    }

    public confirm(content) {
        return this._add(content, 'confirm');
    }

    public information(content) {
        return this._add(content, 'information');
    }

    public warning(content) {
        return this._add(content, 'warning');
    }

    public error(content) {
        return this._add(content, 'error');
    }

    public success(content) {
        return this._add(content, 'success');
    }

    private _add(content, type) {
        type = type || 'success';

        return noty({
            layout: 'topRight',
            text: content,
            type: type,
            animation: {
                open: 'animated bounceInRight',
                close: 'animated bounceOutRight'
            },
            timeout: 3000,
            closeWith: ['click'],
            killer: true,
            theme: 'edoo'
        });
    }

}
