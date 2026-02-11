# Changelog

All notable changes to this project will be documented in this file.

This project follows **Semantic Versioning**.

---

## [0.6.0] - 2026-02-11

### Changed

- Redesigned memory schema to support [immutable node models, version model].
- Updated internal storage structure for improved consistency and future extensibility.

### Migration

- Existing memory data is [ incompatible].

### ⚠ Breaking

- Memory schema updated. Older memory files are not compatible with this version.

---

## [0.5.0] – 2026-02-08

### Added

- Settings module with default preferences
- Clear Data option for safely resetting application data
- Support for editor headings (H1–H3)
- Support for all list item types

### Changed

- Refactored store and service structure
- Updated import paths to follow new conventions
- Improved editor reliability and UI state handling
- Updated navbar icons
- Updated application icon

### Notes

- This is a pre-1.0 release; breaking changes may still occur.

---

## [0.1.0] – 2026-02-06

- Initial functional prototype
