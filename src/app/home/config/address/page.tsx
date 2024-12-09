/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import ConfigTitle from "@/components/ui/buttons/ConfigTitle"
import GradientButton from "@/components/ui/buttons/GradientButton"
import { RootState, useAppSelector } from "@/store/store"
import { Address } from "@/types"
import Image from "next/image"
import aquarela from '$/public/images/logo/icon.png'
import React, { useEffect, useState } from "react"
import alert from "@/types/alert"
import { fetchWrapper } from "@/lib/api/fetch"
import AddressCard from "@/components/ui/utils/AddressCard"
import AddressForms from "@/components/ui/forms/AddressForms"

const ConfigAddress: React.FC = () => {

  const currentUser = useAppSelector((state: RootState) => state.user)
  const [openCreateAddressModal, setOpenCreateAddressModal] = useState<boolean>(false)
  const [openEditAddressModal, setOpenEditAddressModal] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [street, setStreet] = useState<string>('')
  const [houseNumber, setHouseNumber] = useState<number | undefined>()
  const [complement, setComplement] = useState<string | undefined>('')
  const [neighborhood, setNeighborhood] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [CEP, setCEP] = useState<string>('')
  const [isCEPInfo, setIsCEPInfo] = useState<boolean>(false)
  const [updateAddressId, setUpdateAddressId] = useState<number>(0)

  const [userAddresses, setUserAddresses] = useState<Address[]>([])

  const clearFields = () => {
    setStreet('');
    setHouseNumber(undefined);
    setComplement(undefined);
    setNeighborhood('');
    setState('');
    setCity('');
    setCEP('');
    setIsCEPInfo(false);
  }

  const formatCEP = (cep: string): string => {
    return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')
  }

  const cepValidation = async (): Promise<void> => {

    const formattedCEP = CEP.replace('-', '')

    if (!formattedCEP || isNaN(Number(formattedCEP)) || formattedCEP.length !== 8) {

      alert({
        icon: 'warning',
        title: 'CEP é obrigatório e deve ter 8 dígitos'
      })

      return

    }

    const isCEPAlreadyRegistered = userAddresses.some(address => address.cep === formattedCEP)

    if (isCEPAlreadyRegistered) {
      alert({
        icon: 'warning',
        title: 'CEP já cadastrado.',
      })
      return
    }

    try {

      const addressInfo = await getAddressInfoByCEP(formattedCEP)

      if (addressInfo) {
        if (!street) setStreet(addressInfo.logradouro)
        if (!neighborhood) setNeighborhood(addressInfo.bairro)
        if (!state) setState(addressInfo.estado)
        if (!city) setCity(addressInfo.cidade)

        setIsCEPInfo(true)
        
      } else {

        alert({
          icon: 'warning',
          title: 'Não foi possível obter as informações do endereço'
        })

      }

    } catch (error) {

      alert({
        icon: 'warning',
        title: 'Erro ao buscar informações do endereço'
      })

    }

  }

  const fieldValidation = async (): Promise<boolean> => {

    if (!isCEPInfo && !isEdit) {
      await cepValidation()
      return false
    }

    if (!street || typeof street !== 'string') {
      alert({
        icon: 'warning',
        title: 'Logradouro é obrigatório'
      })
      return false
    }
    if (!houseNumber || isNaN(houseNumber)) {
      alert({
        icon: 'warning',
        title: 'Número é obrigatório'
      })
      return false
    }
    if (!neighborhood || typeof neighborhood !== 'string') {
      alert({
        icon: 'warning',
        title: 'Bairro é obrigatório'
      })
      return false
    }
    if (!state || typeof state !== 'string') {
      alert({
        icon: 'warning',
        title: 'Estado é obrigatório'
      })
      return false
    }
    if (!city || typeof city !== 'string') {
      alert({
        icon: 'warning',
        title: 'Cidade é obrigatória'
      })
      return false
    }

    return true

  }

  const getAddressInfoByCEP = async (cep: string): Promise<Address> => {

    try {
      const url = `https://viacep.com.br/ws/${cep}/json/`
      const data: Response = await fetch(url)


      if (!data.ok) {
        throw new Error(`Erro ao buscar o CEP: ${data.statusText}`);
      }

      const result: Address = await data.json()

      if ('erro' in result) {
        throw new Error('CEP não encontrado.')
      }

      interface ViaCEPAddress {
        logradouro: string;
        bairro: string;
        estado: string;
        cidade: string;
      }

      const addressInfo: ViaCEPAddress = {
        logradouro: result.logradouro,
        bairro: result.bairro,
        estado: result.estado,
        cidade: result.localidade as string
      }

      return addressInfo as Address

    } catch (error) {
      console.error(error)
      throw new Error('Erro ao buscar as informações do CEP.')
    }

  }

  const fetchUserAddresses = async () => {
    const resp = await fetchWrapper<{ enderecos: Address[], status_code: number }>('v1/aquarela/address/user/' + currentUser.id)
    if (resp.status_code == 200) {
      setUserAddresses(resp.enderecos)
    } else if (resp.status_code == 404) {
      setUserAddresses([])
    }
  }

  const handleOpenEdit = (address: Address) => {

    setOpenEditAddressModal(true)

    setStreet(address.logradouro)
    setHouseNumber(address.numero_casa)
    setComplement(address.complemento ?? '')
    setNeighborhood(address.bairro)
    setState(address.estado)
    setCity(address.cidade)
    setCEP(formatCEP(address.cep))
    setUpdateAddressId(address.id_endereco as number)

  }

  const handleCreateAddress = async () => {

    const isValid = await fieldValidation()

    if (!isValid) {
      return
    }

    const addressInfo: Address = {
      logradouro: street,
      numero_casa: houseNumber ?? 0,
      complemento: complement ?? '',
      bairro: neighborhood,
      estado: state,
      cidade: city,
      cep: CEP.replace('-', ''),
      id_usuario: currentUser.id,
    }

    const url = 'v1/aquarela/address'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressInfo),
    }

    const resp = await fetchWrapper<{status_code: number}>(url, options)
    console.log(resp)

    if(resp.status_code == 201){
      fetchUserAddresses()
      setOpenCreateAddressModal(false)
    }

  }

  const handleUpdateAddress = async () => {

    const validation = fieldValidation()

    if (!validation) {
      return
    }

    const updatedAddress: Address = {
      logradouro: street,
      numero_casa: houseNumber ?? 0,
      complemento: complement || '',
      bairro: neighborhood,
      estado: state,
      cidade: city,
      cep: CEP.replace('-', ''),
    }

    const url = 'v1/aquarela/address/' + updateAddressId
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAddress),
    }

    const resp = await fetchWrapper(url, options)
    console.log(updatedAddress);
    console.log(resp);

    if (resp) {
      alert({
        icon: 'success',
        title: 'Endereço atualizado!'
      })
      fetchUserAddresses()
      setOpenEditAddressModal(false)
    } else {
      alert({
        icon: 'error',
        title: 'Erro ao atualizar endereço'
      })
    }

  }

  useEffect(() => {
    clearFields()
    setIsCEPInfo(false)
  }, [openCreateAddressModal])

  useEffect(() => {
    setIsCEPInfo(false)
    openEditAddressModal ? setIsEdit(true) : setIsEdit(false)
  }, [openEditAddressModal])

  useEffect(() => {
    setCEP(cep => formatCEP(cep))
  }, [CEP])

  useEffect(() => {
    fetchUserAddresses()
  }, [])

  return (
    <main className="bg-blue-7 min-h-screen flex justify-center p-4 md:py-8 md:bg-transparent md:h-fit md:grow">
      <div className="flex flex-col gap-6 md:gap-12 w-full md:w-1/3">
        <ConfigTitle text="Endereços" returnButton desktopReturnButton />
        <div className={`h-full md:h-fit md:gap-8 px-4 flex flex-col items-center justify-between`}>
          {userAddresses.length > 0 ? (
            <div className="flex flex-col w-full gap-3">
              {userAddresses.map((address) => (
                <AddressCard key={address.id_endereco} edit={handleOpenEdit} refresh={fetchUserAddresses} address={address} />
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col md:w-1/2 grow gap-4 px-4 md:px-0 md:py-12 justify-center items-center">
              <Image
                src={aquarela}
                alt="Logo aquarela"
                width={500}
                height={500}
                className="w-2/5 md:w-1/2 h-auto"
                priority
              />
              <p className="text-blue-1 w-1/2 md:w-full text-center font-medium text-xl">Sem endereços cadastrados</p>
            </div>
          )}
          <GradientButton onClick={() => setOpenCreateAddressModal(true)} className="w-full h-14 [&>p]:!text-xl" direction="left" label="Novo endereço" primaryColor='blue-3' secundaryColor='blue-1' />
        </div>
      </div>
      <AddressForms
        isOpen={openCreateAddressModal}
        onClose={() => setOpenCreateAddressModal(false)}
        onSubmit={handleCreateAddress}
        title="Criar endereço"
        street={street}
        setStreet={setStreet}
        houseNumber={houseNumber}
        setHouseNumber={setHouseNumber}
        complement={complement}
        setComplement={setComplement}
        neighborhood={neighborhood}
        setNeighborhood={setNeighborhood}
        state={state}
        setState={setState}
        city={city}
        setCity={setCity}
        CEP={CEP}
        setCEP={setCEP}
        isCEPInfo={isCEPInfo}
        buttonLabel="Criar"
      />
      <AddressForms
        isOpen={openEditAddressModal}
        onClose={() => setOpenEditAddressModal(false)}
        onSubmit={handleUpdateAddress}
        title="Editar endereço"
        street={street}
        setStreet={setStreet}
        houseNumber={houseNumber}
        setHouseNumber={setHouseNumber}
        complement={complement}
        setComplement={setComplement}
        neighborhood={neighborhood}
        setNeighborhood={setNeighborhood}
        state={state}
        setState={setState}
        city={city}
        setCity={setCity}
        CEP={CEP}
        setCEP={setCEP}
        isCEPInfo={isCEPInfo}
        isEdit={isEdit}
        buttonLabel="Salvar"
      />
    </main>
  )

}

export default ConfigAddress
