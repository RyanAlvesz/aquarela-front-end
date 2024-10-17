import Swal, { SweetAlertIcon } from 'sweetalert2'

interface alertProps {
    title: string,
    icon: SweetAlertIcon
}

const alert = ({title, icon}: alertProps): void => {
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

const stopLoader = (): void => {
    Swal.close()
}

export default alert
export {loader,stopLoader}