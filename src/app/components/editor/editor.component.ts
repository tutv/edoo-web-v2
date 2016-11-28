import {Component, OnInit, EventEmitter, OnDestroy, AfterViewInit} from '@angular/core';
import {Input, Output} from "@angular/core/src/metadata/directives";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() elementId: String;
    @Input() content: string = '';
    @Output() onEditorKeyup = new EventEmitter<any>();
    editor;

    public urlUploadImage = '';
    public eModalImageId = '';

    constructor() {
        this.urlUploadImage = environment.uploadImage;
        this.eModalImageId = this.elementId + '-modal-upload-image';
    }

    ngOnInit() {
    }

    public openModalImageUpload() {
        //noinspection TypeScriptUnresolvedFunction
        $('#' + this.eModalImageId).modal('show');
    }

    public updateContent() {
        this.content = this.editor.getContent();
        this.onEditorKeyup.emit(this.content);
    }

    public imageUploaded(fileHolder) {
        let response = fileHolder['serverResponse'];
        response = JSON.parse(response);

        let image = response.data;
        let html = '';
        html += `<img src="${image.url}" width="${image.width}" height="${image.height}" />`;
        this.editor.insertContent(html);
        this.updateContent();
    }

    ngAfterViewInit() {
        let self = this;

        tinymce.PluginManager.add('stylebuttons', function (editor, url) {
            ['h1', 'h2', 'h3'].forEach(function (name) {
                editor.addButton("style-" + name, {
                    tooltip: "Heading " + name.charAt(1),
                    text: name.toUpperCase(),
                    onClick: function () {
                        editor.execCommand('mceToggleFormat', false, name);
                    },
                    onPostRender: function () {
                        let self = this, setup = function () {
                            editor.formatter.formatChanged(name, function (state) {
                                self.active(state);
                            });
                        };
                        editor.formatter ? setup() : editor.on('init', setup);
                    }
                })
            });
        });

        tinymce.init({
            selector: '#' + this.elementId,
            plugins: ['link', 'stylebuttons', 'autoresize', 'fullscreen', 'preview'],
            skin_url: '/assets/skins/lightgray',
            min_height: 200,
            menubar: false,
            target_list: false,
            link_title: false,
            autoresize_max_height: 1000,
            toolbar1: 'style-h1 style-h2 style-h3 | bold italic | bullist numlist | blockquote | link  | upload ',
            setup: editor => {
                this.editor = editor;

                editor.on('keyup', () => {
                    self.updateContent();
                });

                editor.addButton('upload', {
                    text: false,
                    icon: 'image',
                    onclick: function () {
                        self.openModalImageUpload();
                    }
                });
            },
        });

        this.editor.setContent(this.content);
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }

}
