import React, { CSSProperties } from 'react'
import SwipeableViews from 'react-swipeable-views'
// @ts-ignore
import { autoPlay } from 'react-swipeable-views-utils'
import { Button, MobileStepper, useTheme } from '@material-ui/core'
import { ProductImageDto } from '../../dto/ProductDto'
import { ShopImageDto } from '../../dto/ShopDto'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

interface Props {
  data: ProductImageDto[] | ShopImageDto[]
  style?: CSSProperties
}

const ImageCarousel: React.FC<Props> = props => {
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = props.data.length

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  function handleStepChange(step: number) {
    setActiveStep(step)
  }

  return (
    <div style={props.style}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {props.data.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                src={step.large}
                style={{ objectFit: 'cover', width: '100%' }}
                alt={index.toString()}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      {props.data.length > 1 && (
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      )}
    </div>
  )
}

export default ImageCarousel
