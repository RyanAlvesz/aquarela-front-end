import Swal, { SweetAlertIcon } from 'sweetalert2'

interface AlertProps {
    title: string,
    icon: SweetAlertIcon
}

interface AlertPropsWithDescription extends AlertProps {
    description: string,
    confirmBtn?: string,
    declineBtn?: string
}

const alert = ({title, icon}: AlertProps): void => {
    Swal.fire({
        position: 'top',
        timer: 2000,
        title: `<p class="text-2xl text-blue-2"> ${title} <p>`,
        icon: icon,
        padding: '0.5rem 1rem 1.5rem',
        iconColor: '#5DA5B7',
        showConfirmButton: false,
        width: '25rem',
        background: '#E2E8EB',
        heightAuto: false,
    })
} 

const loader = (): void => {
    Swal.fire({
        position: 'center',
        title: `<h1 class="text-blue-2 text-2xl md:text-4xl">Carregando...</h1>`,
        html: `<div class="flex items-center justify-center w-full h-12 mb-[0.9rem]"> <div class="loader"> </div> </div>`,
        padding: '0.5rem 1.5rem 1.5rem',
        showConfirmButton: false,
        width: '20rem',
        background: '#E2E8EB',
        heightAuto: false,
        customClass: {
            popup: 'alert-rounded'
        }
    })
} 

const swalWithBootstrapButtons  = Swal.mixin({
    customClass: {
        confirmButton: 'alert-confirm-btn',
        cancelButton: 'alert-decline-btn'
      },
      buttonsStyling: false,
      heightAuto: false
})

const confirmAlert = async ({title, description, confirmBtn, declineBtn}: AlertPropsWithDescription): Promise<boolean> => {

    return swalWithBootstrapButtons.fire({
        title: `<p class="text-2xl text-blue-1"> ${title} <p>`,
        html: `<p class="text-blue-2 text-lg mb-1">${description}</p>`,
        icon: 'warning',
        iconColor: '#5DA5B7',
        showCancelButton: true,
        confirmButtonText: confirmBtn ? confirmBtn : 'Sim',
        cancelButtonText: declineBtn ? declineBtn : 'Não',
        padding: '0 0 28px 0',
        heightAuto: false,
        background: '#E2E8EB',
        reverseButtons: true
    }).then((result) => {
        return result.isConfirmed
    })

}

const stopLoader = (): void => {
    Swal.close()
}

export default alert
export {loader,stopLoader, confirmAlert}