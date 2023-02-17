import assign from 'lodash.assign';
import 'animate.css/animate.min.css';
import './editor.scss';

import { ANIMATION_TYPES, capitalize, DEFAULT_VALUES, generateAnimationProps } from './lib';

const { createHigherOrderComponent } = wp.compose;
const { Fragment, useMemo } = wp.element;
const { addFilter } = wp.hooks;
const { InspectorControls } = wp.blockEditor;
const {
  __experimentalGrid: Grid,
  __experimentalNumberControl: NumberControl,
  ComboboxControl,
  ToggleControl,
  PanelBody
} = wp.components;

const ENABLE_ON_BLOCKS = [
  'core/group', // Keep this expanded
  'core/list',
  'core/image',
  'core/column'
];

const addAnimationAttributeControl = (settings, name) => {
  if (!ENABLE_ON_BLOCKS.includes(name)) {
    return settings;
  }

  settings.attributes = assign(settings.attributes, {
    animation: {
      type: 'string',
      default: DEFAULT_VALUES.animation
    },
    duration: {
      type: 'number',
      default: DEFAULT_VALUES.duration
    },
    delay: {
      type: 'number',
      default: DEFAULT_VALUES.delay
    },
    repeat: {
      type: 'number',
      default: DEFAULT_VALUES.repeat
    },
    infinite: {
      type: 'boolean',
      default: DEFAULT_VALUES.infinite
    }
  });

  return settings;
};

addFilter(
  'blocks.registerBlockType',
  'animate-gutenberg-blocks/attribute/animate',
  addAnimationAttributeControl
);

const withAnimationControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const { name, attributes, setAttributes } = props;

    if (!ENABLE_ON_BLOCKS.includes(name)) {
      return <BlockEdit {...props} />;
    }

    const animationTypeOptions = useMemo(() => {
      return [
        {
          label: 'None',
          value: ''
        },
        ...ANIMATION_TYPES.map((type) => ({
          label: capitalize(type),
          value: type
        }))
      ];
    }, [ANIMATION_TYPES, capitalize]);

    const onAnimationTypeSelect = (animation) => {
      if (animation) {
        const { className } = generateAnimationProps(attributes.className, {
          ...attributes,
          animation
        });

        setAttributes({
          animation,
          className
        });
      } else {
        setAttributes({ ...DEFAULT_VALUES });
      }
    };

    const onDurationChange = (duration) => {
      setAttributes({ duration });
    };

    const onDelayChange = (delay) => {
      setAttributes({ delay });
    };

    const onRepeatChange = (repeat) => {
      setAttributes({ repeat });
    };

    const onInfiniteChange = (infinite) => {
      setAttributes({ infinite });
    };

    return (
      <Fragment>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody title={'Animation'}>
            <ComboboxControl
              value={attributes.animation}
              options={animationTypeOptions}
              onChange={onAnimationTypeSelect}
            />
            {attributes.animation && (
              <>
                <Grid
                  columns={2}
                  rows={2}
                  className="animation__properties">
                  <NumberControl
                    label={'Duration, ms'}
                    step={100}
                    value={attributes.duration}
                    onChange={onDurationChange}
                  />
                  <NumberControl
                    label={'Delay, ms'}
                    step={100}
                    value={attributes.delay}
                    onChange={onDelayChange}
                  />
                  <NumberControl
                    label={'Repeat'}
                    step={1}
                    disabled={attributes.infinite}
                    value={attributes.repeat}
                    onChange={onRepeatChange}
                  />
                  <ToggleControl
                    label={'Infinite'}
                    checked={attributes.infinite}
                    onChange={onInfiniteChange}
                  />
                </Grid>
              </>
            )}
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
}, 'withAnimation');

addFilter(
  'editor.BlockEdit', // Keep this expanded
  'animate-gutenberg-blocks/with-animation',
  withAnimationControls
);

const addExtraClass = (extraProps, blockType, attributes) => {
  if (!ENABLE_ON_BLOCKS.includes(blockType?.name)) {
    return extraProps;
  }

  if (!attributes.animation) {
    return extraProps;
  }

  const animationProps = generateAnimationProps(extraProps.className, attributes);

  extraProps = assign(extraProps, animationProps);

  return extraProps;
};

addFilter(
  'blocks.getSaveContent.extraProps',
  'animate-gutenberg-blocks/add-extra-class',
  addExtraClass
);
