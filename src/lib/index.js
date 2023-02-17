import classnames from 'classnames/dedupe';

export const DEFAULT_VALUES = {
	animation: '',
	duration: 1000,
	delay: 0,
	repeat: 1,
	infinite: false
};

export const ANIMATION_TYPES = [
  'bounce',
  'flash',
  'pulse',
  'rubberBand',
  'shakeX',
  'shakeY',
  'headShake',
  'swing',
  'tada',
  'wobble',
  'jello',
  'heartBeat',
  'backInDown',
  'backInLeft',
  'backInRight',
  'backInUp',
  'backOutDown',
  'backOutLeft',
  'backOutRight',
  'backOutUp',
  'bounceIn',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceInUp',
  'bounceOut',
  'bounceOutDown',
  'bounceOutLeft',
  'bounceOutRight',
  'bounceOutUp',
  'fadeIn',
  'fadeInDown',
  'fadeInDownBig',
  'fadeInLeft',
  'fadeInLeftBig',
  'fadeInRight',
  'fadeInRightBig',
  'fadeInUp',
  'fadeInUpBig',
  'fadeInTopLeft',
  'fadeInTopRight',
  'fadeInBottomLeft',
  'fadeInBottomRight',
  'fadeOut',
  'fadeOutDown',
  'fadeOutDownBig',
  'fadeOutLeft',
  'fadeOutLeftBig',
  'fadeOutRight',
  'fadeOutRightBig',
  'fadeOutUp',
  'fadeOutUpBig',
  'fadeOutTopLeft',
  'fadeOutTopRight',
  'fadeOutBottomRight',
  'fadeOutBottomLeft',
  'flip',
  'flipInX',
  'flipInY',
  'flipOutX',
  'flipOutY',
  'lightSpeedInRight',
  'lightSpeedInLeft',
  'lightSpeedOutRight',
  'lightSpeedOutLeft',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'rotateInUpLeft',
  'rotateInUpRight',
  'rotateOut',
  'rotateOutDownLeft',
  'rotateOutDownRight',
  'rotateOutUpLeft',
  'rotateOutUpRight',
  'hinge',
  'jackInTheBox',
  'rollIn',
  'rollOut',
  'zoomIn',
  'zoomInDown',
  'zoomInLeft',
  'zoomInRight',
  'zoomInUp',
  'zoomOut',
  'zoomOutDown',
  'zoomOutLeft',
  'zoomOutRight',
  'zoomOutUp',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
  'slideInUp',
  'slideOutDown',
  'slideOutLeft',
  'slideOutRight',
  'slideOutUp'
];

export const generateAnimationProps = (
  className = '',
  {
    animation, // Keep this expanded
    duration = DEFAULT_VALUES.duration,
    delay = DEFAULT_VALUES.delay,
    repeat = DEFAULT_VALUES.repeat,
    infinite = DEFAULT_VALUES.infinite
  }
) => {
  const classes = [...className.split(' '), 'animate__animated'];
  const style = {
    '--animate-duration': `${duration}ms`
  };
  if (animation) {
    classes.push(`animate__${animation}`);
  }
  if (delay > 0) {
    classes.push('animate__delay-1s');
    style['--animate-delay'] = `${delay / 1000}s`;
  }
  if (infinite) {
    classes.push('animate__infinite infinite');
  } else if (repeat > 1) {
    classes.push('animate__repeat-1');
    style['--animate-repeat'] = String(repeat);
  }

  return {
    className: classnames(...classes),
    style
  };
};

export const capitalize = s => s && s[0].toUpperCase() + s.slice(1);
