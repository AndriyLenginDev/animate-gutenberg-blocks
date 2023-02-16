import assign from 'lodash.assign';
import {
  __experimentalDivider as Divider,
  __experimentalGrid as Grid,
  __experimentalHeading as Heading,
  __experimentalNumberControl as NumberControl,
  __experimentalText as Text,
  ComboboxControl,
  PanelBody
} from '@wordpress/components';

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { InspectorControls } = wp.blockEditor;
// import {createHigherOrderComponent} from '@wordpress/compose';
// import {Fragment} from '@wordpress/element';
// import {addFilter} from '@wordpress/hooks';

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
    animationIn: {
      type: 'string',
      default: ''
    },
    animationOut: {
      type: 'string',
      default: ''
    },
    animationInDelay: {
      type: 'number',
      default: 1000
    },
    animationOutDelay: {
      type: 'number',
      default: 1000
    },
    animationInDuration: {
      type: 'number',
      default: 1000
    },
    animationOutDuration: {
      type: 'number',
      default: 1000
    },
    isVisible: {
      type: 'boolean',
      default: false
    },
    className: {
      type: 'string',
      default: ''
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
    const { animationInDelay, animationInDuration } = attributes;

    const onAnimationTypeSelect = (value) => {
      console.log('onAnimationTypeSelect', value);
    };

    const onDelayChange = (animationInDelay) => {
      setAttributes({ animationInDelay });
    };

    const onDurationChange = (animationInDuration) => {
      setAttributes({ animationInDuration });
    };

    return (
      <Fragment>
        {ENABLE_ON_BLOCKS.includes(name) ? (
          <div style={{ padding: '20px', backgroundColor: 'red' }}>
            <h1>Test wrapper on edit</h1>
            <BlockEdit {...props} />
          </div>
        ) : (
          <BlockEdit {...props} />
        )}

        {ENABLE_ON_BLOCKS.includes(name) && (
          <InspectorControls>
            <PanelBody title={'Animation'}>
              <ComboboxControl
                label={'AnimationIn type'}
                value={'one'}
                options={[
                  {
                    label: 'None',
                    value: ''
                  },
                  {
                    label: 'One',
                    value: 'one'
                  }
                ]}
                onChange={onAnimationTypeSelect}
              />
              <Divider />
              <Heading>Code is Poetry</Heading>
              <Text>Text can be used to render any text-content, like an HTML p or span.</Text>
              <Grid
                columns={1}
                rows={2}>
                <NumberControl
                  label={'Animation In Delay'}
                  labelPosition={'side'}
                  onChange={onDelayChange}
                  step={100}
                  value={animationInDelay}
                  spinControls={'custom'}
                />
                <NumberControl
                  label={'Animation In Duration'}
                  labelPosition={'side'}
                  onChange={onDurationChange}
                  step={100}
                  value={animationInDuration}
                  spinControls={'custom'}
                />
              </Grid>
            </PanelBody>
          </InspectorControls>
        )}
      </Fragment>
    );
  };
}, 'withAnimation');

addFilter(
  'editor.BlockEdit', // Keep this expanded
  'animate-gutenberg-blocks/with-animation',
  withAnimationControls
);

const addAnimationWrapper = (element, blockType, attributes) => {
  console.log('addAnimationWrapper', { element, attributes });

  if (!element) {
    return;
  }

  if (!ENABLE_ON_BLOCKS.includes(blockType.name)) {
    return element;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: 'green' }}>
      <h1>Test wrapper after save</h1>
      {element}
    </div>
  );
};

addFilter(
  'blocks.getSaveElement',
  'animate-gutenberg-blocks/get-save-element',
  addAnimationWrapper
);
