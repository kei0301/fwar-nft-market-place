import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Image, Input, Radio, RadioGroup, Spinner, Stack } from '@chakra-ui/react';
import React, { useState, useRef, useCallback } from 'react';
import { create } from 'ipfs-http-client'
import ipfs from "nano-ipfs-store"
import { useContact } from 'utils/usecontract';
import { useEthers } from '@usedapp/core';
import ScaleFadeCustom from 'components/ScaleFadeCustom';
import toast from 'react-hot-toast';
import { parseUnits } from '@ethersproject/units';
import { useDispatch } from 'react-redux';
import { FlagT } from 'store/nftData';

const ipfsObject = ipfs.at("https://ipfs.infura.io:5001");

const useIPFS = () => {
    const handleAdd = useCallback(
        async (data) => {
            return await ipfsObject.add(data);
        },
        [],
    );
    return { add: handleAdd };
}

const CreateNFT = () => {

    const dispatch = useDispatch();
    const contract = useContact();
    const { account } = useEthers();
    const { add } = useIPFS()
    const client = create('https://ipfs.infura.io:5001/api/v0');
    const inputRef = useRef('');

    const [value, setValue] = useState('character')
    const [fileUrl, updateFileUrl] = useState(``)
    const [n_image, n_imageSetFile] = useState();
    const [loading, setLoading] = useState(false)

    const [character_name, setCharacterName] = useState('')
    const [character_price, setcharacter_price] = useState('')
    const [classs, setclasss] = useState('')
    const [gen, setgen] = useState('')
    const [gender, setgender] = useState('')
    const [rarity, setrarity] = useState('')
    const [release_no, setrelease_no] = useState('')

    const [item_name, setItemName] = useState('');
    const [item_price, setitem_price] = useState('');
    const [overall_rarity, setoverall_rarity] = useState('');
    const [availability, setavailability] = useState('');
    const [strength, setstrength] = useState('');
    const [bloodline_crystal, setbloodline_crystal] = useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const setChangeType = () => {
        if (value === 'character') {
            setValue('item');
        } else {
            setValue('character')
        }
    }

    const onChange = async (e) => {
        n_imageSetFile(e.target.files[0]);
        updateFileUrl(URL.createObjectURL(e.target.files[0]))
    }

    const Select_Image = () => {
        inputRef.current.click()
    }


    const Mint_data = async () => {
        if (account) {
            if (value === 'character') {
                if (character_name !== '' && character_price !== '' && classs !== '' && gen !== '' && gender !== '' && rarity !== '' && release_no !== '') {
                    try {
                        setIsLoading(true)
                        const added_file = await client.add(n_image);
                        const nftInfo = {
                            url: `https://ipfs.infura.io/ipfs/${added_file.path}`,
                            classs: classs,
                            gen: gen,
                            gender: gender,
                            rarity: rarity,
                            release_no: release_no
                        }
                        const cid = await add(JSON.stringify(nftInfo));
                        const price = parseUnits(character_price, 18)
                        await contract.methods.mintElementCrystal(character_name, cid, price)
                            .send({ from: account })
                            .once('transactionhash', (hash) => {
                                console.log(hash);
                                n_imageSetFile();
                                updateFileUrl('');
                                setCharacterName('')
                                setcharacter_price('')
                                setclasss('')
                                setgen('')
                                setgender('')
                                setrarity('')
                                setrelease_no('')
                            });
                        // dispatch(FlagT());
                        setIsLoading(false)
                        toast.success('Minting Success!');
                    } catch (error) {
                        toast.error(error.message);
                        setIsLoading(false)
                    }
                } else {
                    toast.error('Missed Some Data');
                }
            } else {
                if (item_name !== '' && item_price !== '' && overall_rarity !== '' && availability !== '' && strength !== '' && bloodline_crystal !== '') {
                    try {
                        setIsLoading(true)
                        const added_file = await client.add(n_image);
                        const nftInfo = {
                            url: `https://ipfs.infura.io/ipfs/${added_file.path}`,
                            overall_rarity: overall_rarity,
                            availability: availability,
                            strength: strength,
                            bloodline_crystal: bloodline_crystal,
                        }
                        const cid = await add(JSON.stringify(nftInfo));
                        const price = parseUnits(item_price, 18)
                        await contract.methods.mintElementCrystal(item_name, cid, price)
                            .send({ from: account })
                            .once('transactionhash', (hash) => {
                                console.log(hash)
                                n_imageSetFile();
                                updateFileUrl('');
                                setItemName('')
                                setitem_price('')
                                setoverall_rarity('');
                                setavailability('')
                                setstrength('');
                                setbloodline_crystal('')
                            });
                        // dispatch(FlagT());
                        setIsLoading(false)
                        toast.success('Minting Success!');
                    } catch (error) {
                        setIsLoading(false)
                        toast.error(error.message);
                    }
                } else {
                    toast.error('Missed Some Data');
                }
            }
        } else {
            toast.error('Connect Wallet');
        }
    }

    return (
        <>
            <ScaleFadeCustom>
                {isLoading && (
                    <Stack
                        direction="row"
                        justify="center"
                        align="center"
                        pos="absolute"
                        zIndex="docked"
                        bg="#98989d"
                        opacity="0.85"
                        inset="0"
                        position='fixed'
                        zIndex='9999'
                    >
                        <Spinner
                            thickness='15px'
                            speed='0.25s'
                            emptyColor='gray.200'
                            color='#fec443'
                            size='xl'
                            position='absolute'
                            left='48%'
                            top='48%'
                        />
                    </Stack>
                )}
                <Stack spacing={4} pos="relative" w='60%' left='20%' textAlign='center'>
                    <RadioGroup onChange={setChangeType} defaultValue={value} >
                        <Stack direction='row'>
                            <Radio value='character'>Character</Radio>
                            <Radio value='item'>Item</Radio>
                        </Stack>
                    </RadioGroup>
                    {
                        fileUrl && (
                            <div>
                                <Image display="initial" w='150px' src={fileUrl} fallbackSrc='https://via.placeholder.com/150' />
                            </div>
                        )
                    }
                    <Input disabled value={fileUrl} placeholder='Image URL' textAlign='center' />
                    <Input onChange={onChange} ref={inputRef} accept="image/*" placeholder='Input the NFT Name' type='file' display='none' textAlign='center' />
                    {
                        loading ?
                            <Button isLoading colorScheme='teal' variant='solid'>
                                Email
                            </Button>
                            :
                            <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline' onClick={Select_Image}>
                                Select Image
                            </Button>
                    }
                    {
                        value === 'character' ?
                            <Stack spacing={4} pos="relative" textAlign='center'>
                                <Input value={character_name} onChange={event => setCharacterName(event.target.value)} placeholder='Input the character name' textAlign='center' />
                                <Input value={character_price} onChange={event => setcharacter_price(event.target.value)} placeholder='Input the character price' textAlign='center' />
                                <Input value={classs} onChange={event => setclasss(event.target.value)} placeholder='Input the class' textAlign='center' />
                                <Input value={gen} onChange={event => setgen(event.target.value)} placeholder='Input the Gen' textAlign='center' />
                                <Input value={gender} onChange={event => setgender(event.target.value)} placeholder='Input the Gender' textAlign='center' />
                                <Input value={rarity} onChange={event => setrarity(event.target.value)} placeholder='Input the Rarity' textAlign='center' />
                                <Input value={release_no} onChange={event => setrelease_no(event.target.value)} placeholder='Input the Release no' textAlign='center' />
                            </Stack>
                            :
                            <Stack spacing={4} pos="relative" textAlign='center'>
                                <Input value={item_name} onChange={event => setItemName(event.target.value)} placeholder='Input the item name' textAlign='center' />
                                <Input value={item_price} onChange={event => setitem_price(event.target.value)} placeholder='Input the item price' textAlign='center' />
                                <Input value={overall_rarity} onChange={event => setoverall_rarity(event.target.value)} placeholder='Input the overall rarity' textAlign='center' />
                                <Input value={availability} onChange={event => setavailability(event.target.value)} placeholder='Input the availability' textAlign='center' />
                                <Input value={strength} onChange={event => setstrength(event.target.value)} placeholder='Input the item strength' textAlign='center' />
                                <Input value={bloodline_crystal} onChange={event => setbloodline_crystal(event.target.value)} placeholder='Input the bloodline crystal' textAlign='center' />
                            </Stack>
                    }
                    <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline' onClick={Mint_data}>
                        Create
                    </Button>
                </Stack >
            </ScaleFadeCustom>
        </>
    )
}

export default CreateNFT;