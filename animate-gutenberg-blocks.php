<?php
/**
 * Plugin Name:       Animate Gutenberg Blocks
 * Description:       Plugin for animation of Gutenberg blocks.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       animate-gutenberg-blocks
 *
 * @package           create-block
 */

if (!defined('ABSPATH')) {
	exit;
}

add_action('enqueue_block_editor_assets', 'extend_block_attributes');

add_action('wp_enqueue_scripts', 'extend_block_attributes');

function extend_block_attributes()
{
	wp_enqueue_style(
		'animate-gutenberg-blocks-style',
		esc_url(plugins_url('build/index.css', __FILE__)),
		[]
	);

	wp_enqueue_script(
		'animate-gutenberg-blocks-script',
		esc_url(plugins_url('build/index.js', __FILE__)),
		['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor']
	);
}
