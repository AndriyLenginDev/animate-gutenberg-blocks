import assign from 'lodash.assign';
import 'animate.css/animate.min.css';
import {ANIMATION_TYPES, generateAnimationProps} from './lib';

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { InspectorControls } = wp.blockEditor;
const {
  __experimentalDivider: Divider,
  __experimentalGrid: Grid,
  __experimentalHeading: Heading,
  __experimentalNumberControl: NumberControl,
  __experimentalText: Text,
  ComboboxControl,
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
      default: ''
    },
    duration: {
      type: 'number',
      default: 1000
    },
    delay: {
      type: 'number',
      default: 0
    },
    repeat: {
      type: 'number',
      default: 1
    },
    infinite: {
      type: 'boolean',
      default: false
    }
  });

  return settings;
};

addFilter(
  'blocks.registerBlockType',
  'animate-gutenberg-blocks/attribute/animate',
  addAnimationAttributeControl
);

// const withAnimationControls = createHigherOrderComponent((BlockEdit) => {
//   return (props) => {
//     const { name, attributes, setAttributes } = props;
//
//     if (!ENABLE_ON_BLOCKS.includes(name)) {
//       return <BlockEdit {...props} />;
//     }
//
//     attributes.className = 'animate__animated animate__bounce';
//
//     const { animationInDelay, animationInDuration } = attributes;
//
//     const onAnimationTypeSelect = (value) => {
//       console.log('onAnimationTypeSelect', value);
//     };
//
//     const onDelayChange = (animationInDelay) => {
//       setAttributes({ animationInDelay });
//     };
//
//     const onDurationChange = (animationInDuration) => {
//       setAttributes({ animationInDuration });
//     };
//
//     return (
//       <Fragment>
//         <BlockEdit {...props} />
//         <InspectorControls>
//           <PanelBody title={'Animation'}>
//             <ComboboxControl
//             	label={'AnimationIn type'}
//             	value={'one'}
//             	options={[
//             		{
//             			label: 'None',
//             			value: ''
//             		},
//             		{
//             			label: 'One',
//             			value: 'one'
//             		}
//             	]}
//             	onChange={onAnimationTypeSelect}
//             />
//             <Divider />
//             <Heading>Code is Poetry</Heading>
//             <Text>Text can be used to render any text-content, like an HTML p or span.</Text>
//             <Grid
//             	columns={1}
//             	rows={2}>
//             	<NumberControl
//             		label={'Animation In Delay'}
//             		labelPosition={'side'}
//             		onChange={onDelayChange}
//             		step={100}
//             		value={animationInDelay}
//             		spinControls={'custom'}
//             	/>
//             	<NumberControl
//             		label={'Animation In Duration'}
//             		labelPosition={'side'}
//             		onChange={onDurationChange}
//             		step={100}
//             		value={animationInDuration}
//             		spinControls={'custom'}
//             	/>
//             </Grid>
//           </PanelBody>
//         </InspectorControls>
//       </Fragment>
//     );
//   };
// }, 'withAnimation');

const withAnimationControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes, setAttributes } = props;

		if (!ENABLE_ON_BLOCKS.includes(name)) {
			return <BlockEdit {...props} />;
		}
		// attributes.className = 'animate__animated animate__bounce';

		const { animation, duration, delay } = attributes;

		const onAnimationTypeSelect = (animation) => {
			console.log('onAnimationTypeSelect', animation);

			setAttributes({ animation });
		};

		const onDurationChange = (duration) => {
			setAttributes({ duration });
		};

		const onDelayChange = (delay) => {
			setAttributes({ delay });
		};

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={'Animation'}>
						<ComboboxControl
							label={'AnimationIn type'}
							value={animation}
							options={[
								{
									label: 'None',
									value: ''
								},
								...ANIMATION_TYPES.map((type) => ({
									label: type,
									value: type
								}))
							]}
							onChange={onAnimationTypeSelect}
						/>
						{/*<Divider />*/}
						{/*<Heading>Code is Poetry</Heading>*/}
						{/*<Text>Text can be used to render any text-content, like an HTML p or span.</Text>*/}
						<Grid
							columns={1}
							rows={2}>
							<NumberControl
								label={'Duration, ms'}
								labelPosition={'side'}
								onChange={onDurationChange}
								step={100}
								value={duration}
								spinControls={'custom'}
							/>
							<NumberControl
								label={'Delay, ms'}
								labelPosition={'side'}
								onChange={onDelayChange}
								step={100}
								value={delay}
								spinControls={'custom'}
							/>
						</Grid>
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

	console.log({ name: blockType?.name, extraProps, attributes, animationProps });

	extraProps = assign(extraProps, animationProps);

  return extraProps;
};

addFilter(
  'blocks.getSaveContent.extraProps',
  'animate-gutenberg-blocks/add-extra-class',
  addExtraClass
);
