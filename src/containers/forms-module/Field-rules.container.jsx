import React from 'react'

const customStyle = {
  marginLeft: '10px'
}

const FieldRules = () => {
  return (
    <div className=' border-radius'>
      <div className='uk-modal-header'>
        <h2 className='uk-modal-title capitalize microtext'>Add form rules</h2>
      </div>
      <div className='uk-modal-body'>
        <ul className='none my-0 d-flx j-c-sb al-i-c'>
          <li style={customStyle}>
            <h3 className='co-primary nanotext capitalize'>when </h3>
            <select className='p-1 nanotext capitalize borderline'>
              <option className='p-h nanotext' value='equals'>
                equal
              </option>
              <option className='p-h nanotext' value='notequals'>
                not equals
              </option>
              <option className='p-h nanotext' value='changes'>
                changes
              </option>
            </select>
          </li>
          <li style={customStyle}>
            <h3 className='co-primary nanotext capitalize'>value</h3>
            <select className='p-1 nanotext capitalize borderline' name id>
              <option className='p-h nanotext' value>
                value
              </option>
            </select>
          </li>
          <li style={customStyle}>
            <h3 className='co-primary nanotext capitalize'>perform action</h3>
            <select
              className='p-1 d-blk nanotext capitalize borderline'
              name
              id
            >
              <option className='p-h nanotext' value='hide'>
                hide
              </option>
              <option className='p-h nanotext' value='show'>
                show
              </option>
              <option className='p-h nanotext' value='enable'>
                enable
              </option>
              <option className='p-h nanotext' value='disable'>
                disable
              </option>
              <option className='p-h nanotext' value='require'>
                require
              </option>
              <option className='p-h nanotext' value='notrequired'>
                not required
              </option>
              <option className='p-h nanotext' value='filter'>
                filter
              </option>
            </select>
          </li>
          <li style={customStyle}>
            <h3 className='co-primary nanotext capitalize'>
              otherwise perform
            </h3>
            <select className='p-1 nanotext capitalize borderline' name id>
              <option className='p-h nanotext' value='hide'>
                hide
              </option>
              <option className='p-h nanotext' value='show'>
                show
              </option>
              <option className='p-h nanotext' value='enable'>
                enable
              </option>
              <option className='p-h nanotext' value='disable'>
                disable
              </option>
              <option className='p-h nanotext' value='require'>
                require
              </option>
              <option className='p-h nanotext' value='notrequired'>
                not required
              </option>
              <option className='p-h nanotext' value='filter'>
                filter
              </option>
            </select>
          </li>
          <li style={customStyle}>
            <button className='bg-transparent'>
              <svg
                width={18}
                height={18}
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M17 1L1 17'
                  stroke='#F85359'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M1 1L17 17'
                  stroke='#F85359'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </li>
        </ul>
        <button className='p-1 bg-transparent borderline border-radius mt-1 nanotext d-flx al-i-c'>
          <svg
            width={21}
            height={21}
            viewBox='0 0 21 21'
            fill='none'
            stroke='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M17.7335 1.2H3.26686C2.12547 1.2 1.2002 2.12528 1.2002 3.26666V17.7333C1.2002 18.8747 2.12547 19.8 3.26686 19.8H17.7335C18.8749 19.8 19.8002 18.8747 19.8002 17.7333V3.26666C19.8002 2.12528 18.8749 1.2 17.7335 1.2Z'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M10.5 6.36687V14.6335'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M6.36719 10.4998H14.6339'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span className='capitalize suffix'>field rules</span>
        </button>
      </div>
      <div className='uk-modal-footer uk-text-right'>
        <button
          className='uk-button uk-button-default uk-modal-close bg-primary co-white border-radius fw-bold microtext'
          type='button'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default FieldRules
