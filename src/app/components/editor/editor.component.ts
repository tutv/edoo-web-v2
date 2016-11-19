import {Component, OnInit, EventEmitter, OnDestroy, AfterViewInit} from '@angular/core';
import {Input, Output} from "@angular/core/src/metadata/directives";

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

    public field_image;

    constructor() {
    }

    public uploadImage() {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        var self = this;

        tinymce.PluginManager.add('stylebuttons', function (editor, url) {
            ['h1', 'h2', 'h3'].forEach(function (name) {
                editor.addButton("style-" + name, {
                    tooltip: "Heading " + name.charAt(1),
                    text: name.toUpperCase(),
                    onClick: function () {
                        editor.execCommand('mceToggleFormat', false, name);
                    },
                    onPostRender: function () {
                        var self = this, setup = function () {
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
            plugins: ['link', 'stylebuttons', 'image'],
            skin_url: '/assets/skins/lightgray',
            min_height: 200,
            menubar: false,
            target_list: false,
            link_title: false,
            toolbar1: 'style-h1 style-h2 style-h3 | bold italic | bullist numlist | link | blockquote | image',
            setup: editor => {
                this.editor = editor;

                editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.onEditorKeyup.emit(content);
                });
            }
        });

        this.editor.setContent(this.content);

    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }

}
