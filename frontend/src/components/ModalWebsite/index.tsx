"use client";

import { Website } from "@/@types/Website";
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
} from '@chakra-ui/react';
import { Box, Button, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
    mode: 'edit' | 'new',
    open: boolean,
    website: Website | null,
    onClose: () => void,
    refreshWebsites: () => void
}

export const ModalWebsite = ({ mode, open, website, onClose, refreshWebsites }: Props) => {
    const [titleInput, setTitleInput] = useState('')
    const [slugInput, setSlugInput] = useState('')
    const [subTitleInput, setSubTitleInput] = useState('')
    const [bgColorInput, setBgColorInput] = useState('')
    const [txtColorInput, setTxtColorInput] = useState('')

    const toast = useToast();

    const handleSubmit = async () => {
        if (!titleInput || !subTitleInput || !slugInput) {
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
 
        const endpoint = mode == 'edit' ? `websites/${website?.slug}` : 'websites/';
        const method = mode == 'edit' ? 'PUT' : 'POST'

        const response = await useApi({
            endpoint,
            method,
            data: {
                title: titleInput,
                subtitle: subTitleInput,
                slug: slugInput,
                bgcolor: !bgColorInput ? '#000000': bgColorInput,
                txtcolor: !txtColorInput ? '#EEEEEE': txtColorInput
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

            refreshWebsites()
        }
    }

    useEffect(() => {
        website?.title ? setTitleInput(website.title) : setTitleInput('')
        website?.slug ? setSlugInput(website.slug) : setSlugInput('')
        website?.subtitle ? setSubTitleInput(website.subtitle) : setSubTitleInput('')
        website?.bgcolor ? setBgColorInput(website.bgcolor) : setBgColorInput('')
        website?.txtcolor ? setTxtColorInput(website.txtcolor) : setTxtColorInput('')
    }, [website])

    return (
        <Drawer
            isOpen={open}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>
                    {mode == 'edit' ?
                        `Editar Website - #${website?.id}`
                        :
                        'Novo Website'
                    }

                </DrawerHeader>

                <DrawerBody>
                    <Stack spacing='24px'>
                        <Box>
                            <FormLabel htmlFor='title'>Título</FormLabel>
                            <Input
                                id='title'
                                placeholder='Título do website'
                                value={titleInput}
                                onChange={e => setTitleInput(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel htmlFor='subtitle'>Subtítulo</FormLabel>
                            <Input
                                id='subtitle'
                                placeholder='Subtítulo do website'
                                value={subTitleInput}
                                onChange={e => setSubTitleInput(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel htmlFor='slug'>Slug</FormLabel>
                            <Input
                                id='slug'
                                placeholder='Slug do website'
                                value={slugInput}
                                onChange={e => setSlugInput(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel htmlFor='bgcolor'>Cor de fundo</FormLabel>
                            <Input
                                id='bgcolor'
                                type="color"
                                value={bgColorInput}
                                onChange={e => setBgColorInput(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel htmlFor='txtcolor'>Cor dos textos</FormLabel>
                            <Input
                                id='txtcolor'
                                type="color"
                                value={txtColorInput}
                                onChange={e => setTxtColorInput(e.target.value)}
                            />
                        </Box>
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