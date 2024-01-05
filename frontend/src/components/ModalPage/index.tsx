"use client";

import { PageDetail } from "@/@types/Page";
import { useApi } from "@/utils/api";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useToast,
    Switch,
    FormControl,
} from '@chakra-ui/react';
import { Box, Button, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditor from "react-froala-wysiwyg";

type Props = {
    mode: 'edit' | 'new',
    open: boolean,
    page: PageDetail | null,
    onClose: () => void,
    refreshPages: () => void
}

export const ModalPage = ({ mode, open, page, onClose, refreshPages }: Props) => {
    const [titleInput, setTitleInput] = useState('')
    const [websiteIdInput, setWebsiteIdInput] = useState('')
    const [slugInput, setSlugInput] = useState('')
    const [bodyInput, setBodyInput] = useState('')
    const [isIndexInput, setIsIndexInput] = useState<boolean | undefined>(undefined)

    const toast = useToast();

    const handleSubmit = async () => {
        if (!titleInput || !slugInput || !bodyInput || (mode == 'new' && !websiteIdInput)) {
            toast({
                title: 'Alerta',
                description: "Preencha os campos obrigatórios",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            return;
        }

        const endpoint = mode == 'edit' ? `pages/${page?.id}` : 'pages/';
        const method = mode == 'edit' ? 'PUT' : 'POST'

        const response = await useApi({
            endpoint,
            method,
            data: {
                title: titleInput,
                body: bodyInput,
                slug: slugInput,
                is_index: isIndexInput,
                website: mode == 'edit' ? page?.website_id : websiteIdInput
            }
        })

        if (response.error_detail) {
            toast({
                title: 'Erro ao salvar!',
                description: response.error_detail,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
        } else {
            toast({
                title: 'Sucesso!',
                description: "As alterações foram salvas com sucesso!",
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'top-right'
            })

            refreshPages()
        }
    }

    useEffect(() => {
        page?.title ? setTitleInput(page.title) : setTitleInput('')
        page?.slug ? setSlugInput(page.slug) : setSlugInput('')
        page?.body ? setBodyInput(page.body) : setBodyInput('')
        page?.is_index != undefined ? setIsIndexInput(page.is_index) : setIsIndexInput(undefined)
    }, [page])

    return (
        <Drawer
            isOpen={open}
            placement='right'
            onClose={onClose}
            size='xl'
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>
                    {mode == 'edit' ?
                        `Editar Página - #${page?.id}`
                        :
                        'Novo Página'
                    }
                </DrawerHeader>

                <DrawerBody>
                    <Stack spacing='24px'>
                        {mode == 'new' &&
                            <Box>
                                <FormLabel htmlFor='website_id'>Informe o #ID do website</FormLabel>
                                <Input
                                    id='website_id'
                                    placeholder='#ID do website'
                                    value={websiteIdInput}
                                    type="number"
                                    onChange={e => setWebsiteIdInput(e.target.value)}
                                />
                            </Box>
                        }

                        <Box>
                            <FormLabel htmlFor='title'>Título</FormLabel>
                            <Input
                                id='title'
                                placeholder='Título do página'
                                value={titleInput}
                                onChange={e => setTitleInput(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel htmlFor='slug'>Slug</FormLabel>
                            <Input
                                id='slug'
                                placeholder='Slug do página'
                                value={slugInput}
                                onChange={e => setSlugInput(e.target.value)}
                            />
                        </Box>

                        <Box>
                            <FormLabel>Conteúdo da página</FormLabel>
                            <FroalaEditor
                                tag='textarea'
                                model={bodyInput}
                                onModelChange={(text: string) => setBodyInput(text)}
                            />
                        </Box>

                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='is-index' mb='0'>
                                É a página inicial?
                            </FormLabel>
                            <Switch id='is-index' isChecked={isIndexInput} onChange={(e) => setIsIndexInput(e.target.checked)} />
                        </FormControl>
                    </Stack>
                </DrawerBody>

                <DrawerFooter borderTopWidth='1px'>
                    <Button variant='outline' mr={3} onClick={onClose}>
                        Fechar
                    </Button>
                    <Button colorScheme='blue' onClick={handleSubmit}>
                        {mode == 'edit' ? 'Salvar' : 'Publicar'}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}