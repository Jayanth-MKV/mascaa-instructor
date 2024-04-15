"use client"
import "@/styles/editor.css"
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useCallback, useEffect, useState } from 'react'
import Link from '@tiptap/extension-link'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"

const MenuBar = ({description,can,canChange}:any) => {
    const { editor } = useCurrentEditor();
    const [link, setlink] = useState("https://")

    useEffect(() => {
        if(can){
                editor?.commands.setContent(description);
                canChange(false)
        }
      }, [description])


    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = link;

        // cancelled
        if (url === null || url === "") {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
                .run()

            return
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
            .run()
        setlink("")
    }, [editor, link])
    
    if (!editor) {
        return null
    }


    

    return (
        <div className="border-solid rounded-md border flex flex-wrap gap-3 font-mono text-[10px]">
            <button type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={editor.isActive('bold') ? 'is-active' : 'border-solid border border-black p-1'}
            >
                bold
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                className={editor.isActive('italic') ? 'is-active' : 'border-solid border border-black p-1'}
            >
                italic
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                className={editor.isActive('strike') ? 'is-active' : 'border-solid border border-black p-1'}
            >
                strike
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                }
                className={editor.isActive('code') ? 'is-active' : 'border-solid border border-black p-1'}
            >
                code
            </button>
            <button type="button" className={editor.can()
                .chain()
                .focus()
                .redo()
                .run() ? 'is-active' : 'border-solid border border-black p-1 bg-gray-200'}
                onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                clear marks
            </button>
            <button type="button" className={editor.can()
                .chain()
                .focus()
                .redo()
                .run() ? 'is-active' : 'border-solid border border-black p-1 bg-gray-200'} onClick={() => editor.chain().focus().clearNodes().run()}>
                clear nodes
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active' : 'border-solid border border-black p-1'}
            >
                paragraph
            </button>
            <Popover>
                <PopoverTrigger
                    className={editor.isActive('link') ? 'is-active' : 'border-solid border border-black p-1'}

                    onClick={() => setlink(editor.getAttributes('link').href)}
                >Link</PopoverTrigger>

                <PopoverContent>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input value={link} onChange={(e) => setlink(e.target.value)} type="text" placeholder="Link" />
                        <Button type="button"
                            onClick={setLink}
                        >Link</Button>
                        <Button type="button"
                            onClick={() => {
                                setlink("")
                                editor.chain().focus().unsetLink().run()
                            }}
                            disabled={!editor.isActive('link')}
                        >Unlink</Button>
                    </div>
                </PopoverContent>

            </Popover>
            <button type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : 'border-solid border border-black p-1'}
            >
                h1
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : 'border-solid border border-black p-1'}
            >
                h2
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active' : 'border-solid border border-black p-1'}
            >
                h3
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={editor.isActive('heading', { level: 4 }) ? 'is-active' : 'border-solid border border-black p-1'}
            >
                h4
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={editor.isActive('heading', { level: 5 }) ? 'is-active' : 'border-solid border border-black p-1'}
            >
                h5
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={editor.isActive('heading', { level: 6 }) ? 'is-active' : 'border-solid border border-black p-1'}
            >
                h6
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : 'border-solid border border-black p-1'}
            >
                bullet list
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : 'border-solid border border-black p-1'}
            >
                ordered list
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'is-active' : 'border-solid border border-black p-1'}
            >
                code block
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : 'border-solid border border-black p-1'}
            >
                blockquote
            </button>
            <button type="button" className={editor.can()
                .chain()
                .focus()
                .redo()
                .run() ? 'is-active' : 'border-solid border border-black p-1 bg-gray-200'} onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                horizontal rule
            </button>
            <button type="button" className={editor.can()
                .chain()
                .focus()
                .redo()
                .run() ? 'is-active' : 'border-solid border border-black p-1 bg-gray-200'} onClick={() => editor.chain().focus().setHardBreak().run()}>
                hard break
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
                className={editor.can()
                    .chain()
                    .focus()
                    .redo()
                    .run() ? 'is-active' : 'border-solid border border-black p-1 bg-gray-200'}
            >
                undo
            </button>
            <button type="button"
                className={editor.can()
                    .chain()
                    .focus()
                    .redo()
                    .run() ? 'is-active' : 'border-solid border border-black p-1 bg-gray-200'}
                onClick={() => editor.chain().focus().redo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
            >
                redo
            </button>
            <button type="button"
                onClick={() => {
                    //console.log(editor.isActive('textStyle', { color: 'red' }))
                    !editor.isActive('textStyle', { color: 'red' }) ? editor.chain().focus().setColor('red').run() : editor.chain().focus().setColor('').run()
                }}
                className={editor.isActive('textStyle', { color: 'red' }) ? 'is-active' : 'border-solid border border-black p-1'}
            >
                red
            </button>
        </div>
    )
}

const extensions = [
    Link.configure({
        openOnClick: false,
        autolink: true,
    }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
]



const EditorPage = ({ description, onChange,can,canChange }: any) => {
    //console.log(description)
    return (
        <EditorProvider onUpdate={({ editor }) => {
            onChange(editor.getHTML());
            // console.log(editor.getHTML());
            // return false;
        }} slotBefore={<MenuBar description={description} can={can} canChange={canChange} />} extensions={extensions}  content={description}></EditorProvider>
    )
}

export default EditorPage;