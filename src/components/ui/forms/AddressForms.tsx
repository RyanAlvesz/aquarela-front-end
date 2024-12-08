import React from 'react'
import Image from 'next/image'
import AddressInput from '../inputs/AddressInput'
import GradientButton from '../buttons/GradientButton'
import closeButton from '$/public/images/svg/add-button.svg'

interface AddressModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  street: string
  setStreet: (value: string) => void
  houseNumber?: number
  setHouseNumber: (value: number) => void
  complement?: string
  setComplement: (value: string) => void
  neighborhood: string
  setNeighborhood: (value: string) => void
  state: string
  setState: (value: string) => void
  city: string
  setCity: (value: string) => void
  CEP: string
  setCEP: (value: string) => void
  isCEPInfo: boolean
  isEdit?: boolean
  buttonLabel: string
}

const AddressForms: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  street,
  setStreet,
  houseNumber,
  setHouseNumber,
  complement,
  setComplement,
  neighborhood,
  setNeighborhood,
  state,
  setState,
  city,
  setCity,
  CEP,
  setCEP,
  isCEPInfo,
  buttonLabel,
  isEdit = false
}) => {

  if (!isOpen) return null

  return (
    <div
      className="fixed top-0 left-0 flex gap-2 items-center justify-center h-screen w-screen z-[999] bg-black/30"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => e.preventDefault()}
        className="bg-blue-7 w-[90vw] md:w-[35vw] animate-fade-up ease-linear duration-150 relative rounded-2xl grid grid-cols-4 gap-2 gap-x-4 md:gap-4 grid-flow-row p-6 md:p-8"
      >
        <div className="hidden md:flex col-span-1"></div>
        <h2 className="col-span-3 md:col-span-2 text-blue-1 text-start md:text-center font-bold text-2xl">{title}</h2>
        <button
          className="flex items-center justify-end col-span-1 h-8 md:h-10 select-none"
          onClick={onClose}
          type="button"
        >
          <Image
            src={closeButton}
            alt="Fechar modal"
            width={500}
            height={500}
            className="h-full w-auto rotate-45"
            priority
          />
        </button>
        <AddressInput
          label="Logradouro"
          value={street}
          setValue={setStreet}
          disabled={isCEPInfo}
          className="col-span-4"
        />
        <AddressInput
          label="Número"
          value={houseNumber?.toString() ?? ''}
          setValue={(val) => setHouseNumber(Number(val))}
          type="number"
          className="col-span-1"
        />
        <AddressInput
          label="Complemento"
          value={complement ?? ''}
          setValue={setComplement}
          className="col-span-3"
        />
        <AddressInput
          label="Bairro"
          value={neighborhood}
          setValue={setNeighborhood}
          disabled={isCEPInfo}
          className="col-span-2"
        />
        <AddressInput
          label="Estado"
          value={state}
          setValue={setState}
          disabled={isCEPInfo}
          className="col-span-2"
        />
        <AddressInput
          label="Cidade"
          value={city}
          setValue={setCity}
          disabled={isCEPInfo}
          className="col-span-2"
        />
        <AddressInput
          label="CEP"
          value={CEP}
          setValue={setCEP}
          className="col-span-2"
          maxLength={9}
          disabled={isEdit}
        />
        <GradientButton
          onClick={onSubmit}
          className="col-span-4 w-full h-14 mt-4 [&>p]:!text-xl"
          direction="left"
          label={buttonLabel}
          primaryColor="blue-3"
          secundaryColor="blue-1"
        />
      </form>
    </div>
  )
}

export default AddressForms
