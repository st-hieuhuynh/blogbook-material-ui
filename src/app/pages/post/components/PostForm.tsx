import React, { useContext, useEffect, useState } from 'react';

import { Navigate } from 'react-router';

import { PostService } from '@app/core/services/post.service';
import NotificationContext from '@app/shared/contexts/NotificationContext/NotificationContext';
import Modal from '@app/shared/components/modal/Modal';
import LoadingButton from '@app/shared/components/loading-button/LoadingButton';
import ChipInput from '@app/shared/components/chips/ChipInput';
import CustomPrompt from '@app/shared/components/prompt/Prompt';
import { Article } from '@app/core/constants/entity/Article';
import { editorConfiguration } from '@config/ckEditorConfig';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { uploadImage } from '@app/core/services/upload.service';
import PostPreview from './PostPreview';

const PostForm = (props: { postDetail: Article }) => {
  const { postDetail } = props;
  const postService = new PostService();
  const { showNotification } = useContext(NotificationContext);
  const [isPreviewShow, setIsPreviewShow] = useState(false);
  const [isBlocking, setIsBlocking] = useState(true);

  // post state
  const [action, setAction] = useState('');
  const [imageCover, setImageCover] = useState({
    preview: undefined,
    raw: undefined,
  });
  const [status, setStatus] = useState(postDetail.status === 'private');
  const [tags, setTags] = useState(postDetail.tags);
  const [isloadingCover, setIsLoadingCover] = useState(false);

  // title input and validate
  const [title, setTitle] = useState(postDetail.title);
  const [titleTouched, setTitleTouched] = useState(false);
  const titleIsValid = title.trim().length > 20; // validate the title
  const titleIsInvalid = !titleIsValid && titleTouched; // for show the error on UI

  // description input and validate
  const [description, setDescription] = useState(postDetail.description);
  const [descriptionTouched, setDescriptionTouched] = useState(false);
  const descriptionIsValid = description.trim().length > 50;
  const descriptionIsInvalid = !descriptionIsValid && descriptionTouched;

  // content input and validate
  const [content, setContent] = useState(postDetail.content);
  const [contentTouched, setContentTouched] = useState(false);
  const contentIsValid = content.trim().length > 100;
  const contentIsInvalid = !contentIsValid && contentTouched;

  // API state
  const [isLoading, setIsLoading] = useState(false);
  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [isDone, setIsDone] = useState(false);

  // handle preview before publish
  const previewHandler = () => {
    setIsPreviewShow(true);
  };

  // preview image
  const handleChangeImage = (e) => {
    setIsLoadingCover(true);
    if (e.target.files.length) {
      setImageCover({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
    setIsLoadingCover(false);
  };

  // submit handler
  const submitFormHandler = (isDraft = false) => {
    setIsDone(false);
    setHasError(false);
    setIsBlocking(false);
    setTitleTouched(true);
    setDescriptionTouched(true);
    setContentTouched(true);

    const apiHandler = async () => {
      isDraft ? setIsDraftLoading(true) : setIsLoading(true);
      try {
        // get url image
        let url = null;
        if (imageCover.raw) {
          url = await uploadImage({
            typeUpload: 'cover-post',
            picture: imageCover.raw,
          });
        }
        const data = {
          title,
          description,
          content,
          tags: tags,
          cover: url || postDetail.cover,
          status: status ? 'private' : 'public',
        };
        // call api service
        if (isDraft && !postDetail.id) {
          setAction('Save Draft');
          await postService.createDraft(data);
        } else if (isDraft && postDetail.id) {
          setAction('Update Draft');
          await postService.updatePost(
            { ...data, status: 'draft' },
            postDetail.id
          );
        } else if (!postDetail.id) {
          setAction('Create Post');
          await postService.createPost(data);
        } else {
          setAction('Update Post');
          await postService.updatePost(data, postDetail.id);
        }
      } catch (error) {
        setHasError(error);
      }
      isDraft ? setIsDraftLoading(false) : setIsLoading(false);
      setIsDone(true);
    };

    titleIsValid && descriptionIsValid && contentIsValid && apiHandler();
  };

  // show notification
  useEffect(() => {
    if (isDone && !hasError) {
      showNotification({ isSuccess: true, message: `${action} Successfully` });
    }
    if (isDone && hasError) {
      showNotification({
        isSuccess: false,
        message: `${action} Unsuccessfully`,
      });
    }
  }, [isDone]);

  if (isDone && (action === 'Create Post' || action === 'Update Post')) {
    return <Navigate to={'/profile/me'} />;
  }

  if (isDone && action === 'Save Draft') {
    return <Navigate to={'/draft'} />;
  }

  return (
    <>
      <CustomPrompt
        isBlocking={isBlocking}
        title="Unsaved Changes"
        message="It looks like you have been editing something. If you leave before saving, your changes will be lost."
      />
      <div className="new-post container container-sm">
        <form className="post-form">
          <img
            className="post-cover"
            src={imageCover.preview || postDetail.cover}
            alt="post cover"
          />
          <div className="post-form-options">
            <label
              htmlFor="fileInput"
              title="Add cover image"
              className="choose-image"
            >
              {isloadingCover ? (
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgifimage.net%2Fwp-content%2Fuploads%2F2017%2F09%2Fajax-loading-gif-transparent-background-8.gif&f=1&nofb=1"
                  alt="loading"
                  className="loading-indicator"
                />
              ) : (
                <img
                  className="post-form-file-img"
                  src="/assets/icons/plus-icon.svg"
                  alt="add image"
                />
              )}
              <p className="choose-image-text">Select a cover image</p>
            </label>
            <input
              id="fileInput"
              type="file"
              multiple
              accept="image/*"
              className="post-form-file"
              onChange={handleChangeImage}
            />
            <div>
              <label htmlFor="status">Public:</label>
              <input
                id="status"
                className="switch-toggle"
                type="checkbox"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />
            </div>
          </div>
          <div className="post-form-group">
            <input
              className={'post-form-input post-form-title'}
              placeholder="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={(e) => setTitleTouched(true)}
            />
          </div>
          {titleIsInvalid && (
            <span className="form-error post-form-error">
              Title length must be at least 20 characters long
            </span>
          )}
          <div className="post-form-group">
            <textarea
              className="post-form-input post-form-description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={(e) => setDescriptionTouched(true)}
            />
          </div>
          {descriptionIsInvalid && (
            <span className="form-error post-form-error">
              Description length must be at least 50 characters long
            </span>
          )}
          <div className="form-editor">
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              data={content}
              className="post-form-content"
              onChange={(event, editor) => {
                setContent(editor.getData());
              }}
              onBlur={(e) => setContentTouched(true)}
            />
          </div>
          {contentIsInvalid && (
            <span className="form-error post-form-error">
              Content length must be at least 100 characters long
            </span>
          )}
          <div className="post-form-group">
            <ChipInput
              value={tags}
              setValue={setTags}
              placeholder="Press Enter to add a tag"
            />
          </div>
          <div className="post-form-submit">
            <div>
              <button
                onClick={previewHandler}
                type="button"
                className="btn btn-outline btn-publish"
              >
                Preview
              </button>
            </div>
            <div className="post-form-publish">
              {(!postDetail.id || postDetail.status === 'draft') && (
                <LoadingButton
                  classBtn="btn btn-secondary btn-publish ml-4"
                  loading={isDraftLoading}
                  handleFunction={() => submitFormHandler(true)}
                  type="button"
                >
                  Save Draft
                </LoadingButton>
              )}
              <LoadingButton
                classBtn="btn btn-primary btn-publish"
                loading={isLoading}
                handleFunction={() => submitFormHandler()}
                type="button"
              >
                Publish
              </LoadingButton>
            </div>
          </div>
        </form>
        {isPreviewShow && (
          <Modal setShow={setIsPreviewShow} className="modal-preview">
            <PostPreview
              post={{
                title: title,
                cover: imageCover.preview,
                content: content,
              }}
            />
          </Modal>
        )}
      </div>
    </>
  );
};

export default PostForm;
