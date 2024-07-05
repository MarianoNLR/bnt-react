import PropTypes from 'prop-types'

export const FormInput = (props) => {
    return (
        <>
            <input className={props.className} type={props.type} name={props.name} id={props.id} placeholder={props.placeholder} onChange={(e) => props.onChange(e)}/>
        </>
    )
}

FormInput.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func
}